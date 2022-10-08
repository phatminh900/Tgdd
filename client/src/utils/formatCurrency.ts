const formatCurrency = (number: number) => {
  return Intl.NumberFormat("vi-vn").format(number);
};

export default formatCurrency;
