export interface IPhoneDocument {
  title: string;
  imgCover: string;
  colors: string[];
  storage: number[];
  price: number;
  prices: number[];
  type: string;
  firm: string;
  ratingQuantity: number;
  ratingAverage: number;
  category: string;
  // slugs: string[];
  slug: string;
  discount: { discount: number; code: string }[];
  promotion: Array<string>;
  otherVersions: string[];
  imgColorsCover: string[];
  generalInformation: string[];
  imgs: {
    imgHighlights: string[];
    imgConfiguration: string[];
    imgGeneralInformation: string[];
    [key: string]: string[];
  };
  reviews: {
    _id: string;
    review: string;
    rating: number;
    photo?: string;
    phone: string;
    user: { _id: string; name: string };
  }[];
  _id: string;
  //   promotion,
  configuration: {
    monitor: {
      type: string;
      inch: number;
      technology: string;
      resolution: string;
      wideScreen: string;
      broadScreen: string;
      maximumLight: number;
      introductionGlass: string;
    };
    operatingSystem: {
      type: string;
      cpuSpeed: number;
      gpu: string;
      version: number;
      number: number;
    };
    rearCam: {
      quantity: number;
      quality: number;
      film: string[];
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
      number: string;
      technology: string;
    };
    ram: number;
    residualMemory: number;
    contacts: "limited" | number;
    internalMemory: number;
    sim: {
      quantity: number;
      type: string;
    };
    battery: {
      volume: number;
      capacity: number;
      charge: number;
      W: number;
      type: string;
    };
    design: string;
    material: string;
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

export interface ILaptopDocument {
  title: string;
  imgCover: string;
  colors: string[];
  firm: string;
  storage: number[];
  ratingQuantity: number;
  ratingAverage: number;
  slug: string;
  price: number;
  type: string;

  generalInformation: Array<string>;
  discount: { discount: number; code: string }[];
  otherVersions: string[];
  imgColorsCover: string[];
  imgs: {
    imgHighlights: string[];
    imgConfiguration: string[];
    imgGeneralInformation: string[];
    [key: string]: string[];
  };
  reviews: {
    _id: string;
    review: string;
    rating: number;
    photo?: string;
    phone: string;
    user: { _id: string; name: string };
  }[];
  _id: string;
  prices: number[];
  category: string;
  // slugs: string;
  promotion: string[];
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
    imgs: Object;
    special: string;
    design: {
      type: string;
    };
    screen: {
      inch: number;
      technology: string;
      width: string;
      height: string;
    };
    cardScreen: {
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
export interface IProductDocument {
  title: string;
  price: number;
  ratingAverage: number;
  ratingQuantity: number;
  imgCover: string;
  category: string;
  slug: string;
  recommend: boolean;
  _id: string;
}
