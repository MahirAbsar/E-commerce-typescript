import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide review title"],
      maxlength: 100,
    },
    comment: {
      type: String,
      trim: true,
      required: [true, "Please provide review text"],
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.statics.calculateAverageRating = async function (
  productId: mongoose.ObjectId
) {
  const result = await this.aggregate([
    {
      $match: {
        product: productId,
      },
    },
    {
      $group: {
        _id: null,
        averageRating: {
          $avg: "$rating",
        },
        numOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);
  try {
    await model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating) || 0,
        numOfReviews: result[0]?.numOfReviews,
      }
    );
  } catch (error) {}
};

reviewSchema.post("save", async function () {
  await (this.constructor as any).calculateAverageRating(this.product);
});

export const Review = model("Review", reviewSchema);
