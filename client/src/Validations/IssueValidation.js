import * as yup from "yup";
export const issueSchemaValidation = yup.object().shape({
  title: yup.string().required("Issue title required"),
  category: yup.string().required("Choose the Category"),
  description: yup.string().required("Description required"),
  building: yup.string().required("Choose the building"),
});
