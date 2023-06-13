import { ICategoriesSummary } from "@/hooks/APIs/useGetgroups";
import { RcFile } from "antd/es/upload";

export function cleanString(inputString: string): string {
  if (!inputString) {
    return "";
  }
  // Remove spaces
  let str = inputString.replace(/\s/g, "");
  // Convert to lowercase
  return str.toLowerCase();
}

interface PasswordObject {
  [key: string]: string;
}

export function encodeDecodeInfos(
  obj: PasswordObject,
  secretKey: string
): PasswordObject {
  const encodedObj: PasswordObject = {};
  Object.keys(obj)?.forEach((key) => {
    let encodedStr = "";
    const str = obj[key];
    for (let i = 0; i < str.length; i++) {
      let charCode =
        str.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length);
      encodedStr += String.fromCharCode(charCode);
    }
    encodedObj[key] = encodedStr;
  });
  return encodedObj;
}

// const passwords: PasswordObject = {
//   email: "myemailpassword",
//   database: "mydatabasepassword",
//   api: "myapipassword",
// };
// const secretKey = "mysecretkey";

// const encodedPasswords = encodeDecodeInfos(passwords, secretKey);
// console.log(encodedPasswords);
// // outputs: { email: '«§§§§§§§¬¦¦¦¦¦',
// //            database: '«§§§§§§§¬¦¦¦¦¦',
// //            api: '«§§§§§§§¬¦¦¦¦¦' }

// const decodedPasswords = encodeDecodeInfos(encodedPasswords, secretKey);
// console.log(decodedPasswords);
// // outputs: { email: 'myemailpassword',
// //            database: 'mydatabasepassword',
// //            api: 'myapipassword' }

export const parseUrlToQuery = (data: any, isQuery = false) => {
  var query: any = {};
  let qr = "";
  // parse url string to obj
  if (isQuery) {
    var pairs = (data[0] === "?" ? data.substr(1) : data).split("&");
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split("=");
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    }
    return query;
  }
  // parse obj to string
  else {
    if (!!data) {
      const keys = Object.keys(data);
      const values = Object.values(data);
      qr += "?";
      keys?.forEach((item, id) => {
        qr += `${item}=${values[id]}${id < keys.length - 1 ? "&" : ""}`;
      });
    }
    return qr;
  }
};

export function findObjectById(
  id: string,
  data: ICategoriesSummary[]
): ICategoriesSummary | undefined {
  return data.reduce<ICategoriesSummary | undefined>((result, item) => {
    if (result) {
      return result;
    }
    if (cleanString(item.name) === id) {
      return item;
    }
    if (item.categories) {
      return findObjectById(id, item.categories);
    }
    return undefined;
  }, undefined);
}

export function convertNullishValues(
  obj: Record<string, unknown>
): Record<string, unknown> {
  const newObj = {} as Record<string, unknown>;

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) {
      newObj[key] = "";
    } else {
      newObj[key] = value;
    }
  }

  return newObj;
}

export const imgAccepList = [
  "image/jpeg",
  "image/JPEG",
  "image/jpg",
  "image/JPG",
  "image/png",
  "image/PNG",
  "image/gif",
  "image/GIF",
];

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export function convertFormData(values: { [key: string]: any }): FormData {
  const newData = convertNullishValues(values);
  const dataSubmit = new FormData();
  for (const key in newData) {
    if (newData.hasOwnProperty(key)) {
      const value: any = newData[key];
      if (Array.isArray(value)) {
        for (const item of value) {
          dataSubmit.append(key, item);
        }
      } else if (value !== null) {
        dataSubmit.append(key, value);
      }
    }
  }
  return dataSubmit;
}

export const turnSelectOption = (arr?: Array<any>) => {
  if (!arr) {
    return [];
  }
  return arr?.map((item) => {
    return {
      label: item?.name,
      value: item?.id,
    };
  });
};
