export const turnSubmitData = (values: any) => {
  const dataSubmit: any = new FormData();
  // values?.categories.forEach((val: any) => {
  //   if (val?.value) {
  //     dataSubmit.append(`categories[]`, val?.value);
  //   } else dataSubmit.append(`categories[]`, val);

  // });
  values?.categories?.forEach((val: any) => {
    const category = val?.value ?? val;
    dataSubmit.append("categories[]", category);
  });
  dataSubmit.append("name", values?.name);
  //   dataSubmit.append("categories", values?.categories);
  dataSubmit.append("email", values?.email);
  dataSubmit.append("mainnet", values?.mainnet);
  dataSubmit.append("isWarning", values?.isWarning);
  dataSubmit.append("isVerify", values?.isVerify);
  dataSubmit.append("isPremium", values?.isPremium);
  dataSubmit.append("isNativeBase", values?.isNativeBase);
  dataSubmit.append("description", values?.description);
  dataSubmit.append("short_description", values?.short_description);
  dataSubmit.append("file", values?.file?.fileList[0]?.originFileObj);
  dataSubmit.append("dAppUrl", values.dAppUrl ?? "");
  dataSubmit.append("website", values.website ?? "");
  dataSubmit.append("facebook", values.facebook ?? "");
  dataSubmit.append("twitter", values.twitter ?? "");
  dataSubmit.append("telegram", values.telegram ?? "");
  dataSubmit.append("github", values.github ?? "");
  dataSubmit.append("discord", values.discord ?? "");
  dataSubmit.append("medium", values.medium ?? "");

  return dataSubmit;
};
