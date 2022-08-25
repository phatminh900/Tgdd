import mongoose, { mongo, Schema } from "mongoose";
import requiredField from "utils/requiredField";
import { phoneSchemaObj } from "./phoneSchema";

export interface PhoneDocument {
  title: string;
  imgCover: string;
  colors: string[];
  storage: number[];
  prices: number[];
  ratingQuantity: number;
  ratingAverage: number;
  slug: string;
  promotion: string[];
  configuration: {
    monitor: {
      type: string;
      inch: number;
      technology: string;
      resolution: string;
      wideScreen: string;
      maximunBrightLess: number;
      introductionGlass: string;
    };
    sim: {
      type: string;
      quantity: string;
    };
    operatingSystem: {
      type: string;
      cpuSpeed: number;
      gpu: string;
      version: number;
    };
    rearCam: {
      camQuantity: number;
      quality: number;
      firm: string[];
      haveFlash: boolean;
      features: string[];
    };
    frontCam: {
      camQuantity?: number;
      features: string[];
      quality: number;
    };
    chip: {
      type: string;
    };
    ram: number;
    residualMemory: number;
    contacts: "limited" | number;
    internalMemory: number;

    battery: {
      capacity: number;
      charge: number;
      type: string;
    };
    // connect: {
    //   mobileNetwork: string;
    // };
    launchTime: string;
    size: {
      length: number;
      width: number;
    };
    volume: {
      depth: number;
      weight: number;
    };
  };
}
const phoneSchema = new mongoose.Schema(
  // @ts-ignore
  {
    title: {
      ...requiredField(String, "Phone must have title"),
      unique: true,
    },
    slug: {
      type: String,
    },
    category: {
      type: String,
      default: "iphone",
    },
    original: {
      type: Boolean,
      required: [true, "Phone must have original"],
      default: true,
    },

    firm: requiredField(String, "Phone must have firm"),
    imgCover: {
      ...requiredField(String, "Phone must have imgCover"),
    },

    imgColorsCover: {
      type: Array,
    },
    imgs: {
      type: Object,
    },
    colors: {
      type: [String],
      required: "Phone must have a color",
    },
    storage: {
      type: [String],
      required: "Phone must have a storage",
    },
    price: {
      ...requiredField(Number, "Phne must have price"),
    },
    prices: {
      type: [Number],
      required: [true, "Phone must have price"],
      min: 100,
    },
    ratingAverage: {
      type: Number,
      default: 0,
      min: [0, "Rating average can't below than 0"],
      max: [5, "Rating average can't above 5"],
      set: function (val: number) {
        return (Math.round(val * 100) / 100).toFixed(1);
      },
    },
    ratingQuantity: {
      type: Number,
      default: 0,
      min: [0, "Rating quantity can't below than 0"],
    },
    promotion: [String],
    configuration: {
      // type: Object,
      // required: [true, "Phone must have configuration"],
      monitor: {
        ...requiredField(Object, "Phone must have monitor"),
      },
      operatingSystem: {
        ...requiredField(Object, "Phone must have operatingSystem"),
      },
      rearCam: {
        ...requiredField(Object, "Phone must have rearCam"),
      },
      frontCam: requiredField(Object, "Phone must have frontCam"),
      chip: requiredField(Object, "Phone must have chip"),
      ram: requiredField(Number, "Phone must have ram"),
      residualMemory: requiredField(Number, "Phone must have residualMemory"),
      internalMemory: requiredField(Number, "Phone must have internalMemory"),
      battery: requiredField(Object, "Phone must have battery"),
      // connect: requiredField(Object, "Phone must have connect"),
      size: requiredField(Object, "Phone must have size"),
      volume: requiredField(Object, "Phone must have volume"),
      design: {
        type: String,
        default: "Nguyên khối",
      },
      material: String,
      launchTime: requiredField(String, "Phone must have Launch Time"),
      sim: {
        type: Object,
        default: {
          type: "Nano",
          quantity: 2,
        },
      },
      // inch:
    },
    otherVersions: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
phoneSchema.pre("save", function (next) {
  const title = this.title;
  // original version slug
  this.slug = !/\d+GB/i.test(this.title!)
    ? `${title.split(" ").join("-")}-${this.storage[0]}GB`
    : title.split(" ").join("-");

  //
  this.otherVersions =
    this.storage.length === 1
      ? []
      : this.storage.map((st) => {
          // original version
          if (!/\d+GB/i.test(this.slug!)) {
            return `${this.slug}-${st}GB`;
          }
          return `${this.slug?.replace(/\d+GB/i, (match) => `${st}GB`)}`;
        });
  next();
});
// find only the original
// phoneSchema.pre("find", function () {
//   this.find({ original: { $eq: true } });
// });
// phoneSchema.pre(/^findOne/, function (next) {
//   this.findOne({ $or: [{ original: true }, { original: false }] });
// });
// phoneSchema.post("save", function (doc, next) {
//   doc.populate({
//     path: "otherVersions",
//     populate: { path: "otherVersions" },
//   });
// });

// phoneSchema.pre("find", async function (next) {
//   console.log("RUn before await");
//   this.populate({
//     path: "otherVersions",
//   });
//   next();
// });
phoneSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "phone",
  localField: "_id",
});
const Phone = mongoose.model<PhoneDocument>("Phone", phoneSchema);
export default Phone;
