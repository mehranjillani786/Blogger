
export default function GeneralValidation(validationParams) {
  let errorMessage = ["true"];
  let flag = 'false'
  let regex = "";
  let caseType = "";
  let minValue = "";
  let maxValue = "";
  let caseKey = "";
  let caseValue = '';
  let specificField = []
  validationParams.map((elements) => {
    caseType = elements[0];
    caseValue = elements[1];
    minValue = elements[2];
    maxValue = elements[3];
    specificField = elements[4];
    if (caseType !== "" || caseValue !== '') {

      switch (caseType) {
        case "userName":
        case "first_name":
        case "last_name":
          regex = new RegExp(`^[a-zA-Z]{${minValue},${maxValue}}$`);
          errorMessage = [...errorMessage, checkRegex(regex, caseValue)];
          break;
        case "full_name":
          regex = new RegExp(`^[a-zA-Z0-9_ ]{${minValue},${maxValue}}$`);
          errorMessage = [...errorMessage, checkRegex(regex, caseValue)];
          break;
        case "password":
          regex = new RegExp(`^.{${minValue},${maxValue}}$`);
          errorMessage = [...errorMessage, checkRegex(regex, caseValue)];
          break;
        case "email":
          regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
          errorMessage = [...errorMessage, checkRegex(regex, caseValue)];
          break;
        case "phone":
          regex = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;
          errorMessage = [...errorMessage, checkRegex(regex, caseValue)]; 
          break;
        case "boolean": //0,1
          if (['0', '1'].includes(caseValue)) {
            flag = 'true'
          }
          errorMessage = [...errorMessage, flag];
          break;
        case "alphaOnly":
          regex = /[^a-zA-Z]/;
          errorMessage = [...errorMessage, checkRegex(regex, caseValue)];
          break;
        case "numericOnly":
          regex = /^[0-9\b]+$/;
          errorMessage = [...errorMessage, checkRegex(regex, caseValue)];
          break;
        case "url": // complete url
          regex =
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
          errorMessage = [...errorMessage, checkRegex(regex, caseValue)];
          break;
        case "absolutePath": //alpha with  /
          regex = /^\/([A-z0-9-_+]+\/)*([A-z0-9]+\.(txt|zip|png))$/;
          errorMessage = [...errorMessage, checkRegex(regex, caseValue)];
          break;
        case "capAlphaUnderscore":
          regex = /^[A-Z_]*$/;
          if (regex.test(caseValue)) {
            errorMessage = [...errorMessage, checkRegex(regex, caseValue)];
          }
          break;
        case "valueLengthCheck":
          if (caseKey.length > caseValue) {
            errorMessage = [...errorMessage, "true"];
          }
          break;
        case "specific":
          if (specificField.includes(caseValue)) {
            flag = 'true'
          }
          errorMessage = [...errorMessage, flag];
          break;
        case "required":
          regex = /\S/;
          errorMessage = [...errorMessage, checkRegex(regex, caseValue)];
          break;
        case "file":
          regex = /\S/;
          var val = specificField.toLowerCase()
          regex = new RegExp(`(.*?)\.(${val})$`);
          errorMessage = [...errorMessage, checkRegex(regex, caseValue)];
          break;
        default:
          return "false";
      }
    } else {
      return "false";
    }
  });
  if (errorMessage.includes("false")) {
    return false;
  } else {
    return true;
  }
}

const checkRegex = (regex, caseValue) => {
  if (regex.test(caseValue)) {
    return "true";
  }
  else {
    return "false";
  }
};
