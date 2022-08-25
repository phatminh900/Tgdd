import requiredField from "utils/requiredField";

export const phoneSchemaObj = {
  title: {
    ...requiredField(String, "Phone must have title"),
    minLength: 10,
    unique: true,
  },

  firm: requiredField(String, "Phone must have firm"),
  imgCover: {
    ...requiredField(String, "Phone must have imgCover"),
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
    launchTime: requiredField(String, "Phone must have Launch Time"),

    // inch:
  },
};
//   {
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   }
