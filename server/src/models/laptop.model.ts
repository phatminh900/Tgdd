import mongoose, { mongo, Schema } from "mongoose";
import requiredField from "utils/requiredField";

export interface ILaptopDocument {
  title: string;
  imgCover: string;
  colors: string[];
  storage: number[];
  prices: number[];
  ratingQuantity: number;
  ratingAverage: number;
  inStock: boolean;
  slug: string;
  promotion: string[];
  type: string;
  configuration: {
    cpu: {
      type: string;
      version: string;
    };

    operatingSystem: {
      type: string;
      cpuSpeed: number;
      gpu: string;
      version: number;
    };
    special: String;
    screen: {
      inch: number;
      technology: string;
      width: string;
      height: string;
    };
    cardScreen: {
      type: string;
    };
    design: {
      type: string;
    };
    ram: number;
    residualMemory: number;
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
const laptopSchema = new mongoose.Schema(
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
    },
    original: {
      type: Boolean,
      required: [true, "Laptop must have original"],
      default: true,
    },

    firm: requiredField(String, "Laptop must have firm"),
    imgCover: {
      type: String,
    },

    imgColorsCover: {
      type: Array,
    },
    imgs: {
      type: Object,
      default: {},
    },
    colors: {
      type: [String],
      required: "Laptop must have a color",
    },
    storage: {
      type: [String],
      required: "Laptop must have a storage",
    },
    price: {
      ...requiredField(Number, "Phne must have price"),
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
    inStock: {
      type: Boolean,
      default: true,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
      min: [0, "Rating quantity can't below than 0"],
    },
    type: {
      ...requiredField(String, "Phone must have type"),
    },
    promotion: [String],
    discount: [Object],
    generalInformation: {
      type: [String],
      required: [true, "Laptop must have generalInformation"],
    },
    configuration: {
      // type: Object,
      // required: [true, "Laptop must have configuration"],
      cpu: {
        ...requiredField(Object, "Laptop must have cpu"),
      },
      operatingSystem: {
        ...requiredField(Object, "Laptop must have operatingSystem"),
      },
      special: String,

      cardScreen: {
        ...requiredField(Object, "Laptop must have cardScreen"),
      },

      screen: requiredField(Object, "Laptop must have screen"),
      ram: requiredField(Number, "Laptop must have ram"),
      residualMemory: requiredField(Number, "Laptop must have residualMemory"),
      internalMemory: requiredField(Number, "Laptop must have internalMemory"),
      battery: requiredField(Object, "Laptop must have battery"),
      // connect: requiredField(Object, "Laptop must have connect"),
      size: requiredField(Object, "Laptop must have size"),
      //   volume: requiredField(Object, "Laptop must have volume"),
      design: {
        type: String,
      },
      launchTime: requiredField(String, "Laptop must have Launch Time"),

      // inch:
    },
    otherVersions: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
laptopSchema.pre("save", function (next) {
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

laptopSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "laptop",
  localField: "_id",
});
const Laptop = mongoose.model<ILaptopDocument>("Laptop", laptopSchema);
export default Laptop;
