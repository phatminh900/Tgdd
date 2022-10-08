class APIFeatures {
  query: any;
  queryStr: any;
  constructor(query: any, queryStr: any) {
    this.query = query;
    this.queryStr = queryStr;
  }
  filter() {
    this.queryStr = JSON.parse(
      JSON.stringify(this.queryStr).replace(
        /\b(gte|gt|lt|lte)\b/gi,
        (match) => `$${match}`
      )
    );
    this.query = this.query.find(this.queryStr);
    return this;
  }
  // Sorting
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  // // limit Fields
  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");

      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  // // Pagination
  paginate() {
    const page = this.queryStr.page || 1;
    const limit = this.queryStr.limit || 10;
    const skip = (+page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
  // // chain method on Tour
}
export default APIFeatures;
