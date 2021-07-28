/** @format */

import { useState } from "react";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import axios from "axios";
import CreateCourse from "../../../components/forms/CreateCourse";
import InstructorRoute from "../../../components/routes/InstructorRoute";

const CourseCreate = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    uploading: false,
    paid: true,
    loading: false,
    category: "",
  });

  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });

    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/course/upload-image", {
          image: uri,
        });
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (error) {
        setValues({ ...values, loading: false });
        toast("Image upload failed. Try again");
      }
    });
  };

  const handleImageRemove = async () => {
    try {
      setValues({ ...values, loading: true });
      const res = await axios.post("/api/course/remove-image", { image });
      setImage({});
      setPreview("");
      setUploadButtonText("Upload Image");
      setValues({ ...values, loading: false });
    } catch (error) {
      setValues({ ...values, loading: false });
      toast("Image upload failed. Try again");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <InstructorRoute>
      <div className="p-5 mb-4 bg-primary bg-gradient">
        <div className="container-fluid py-5">
          <h1 className="text-center text-white">Create course</h1>
        </div>
      </div>

      <div className="py-3">
        <CreateCourse
          handleSubmit={handleSubmit}
          handleImageUpload={handleImageUpload}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
          handleImageRemove={handleImageRemove}
        />
      </div>
      <pre>{JSON.stringify(values, null, 4)}</pre>
      <pre>{JSON.stringify(image, null, 4)}</pre>
    </InstructorRoute>
  );
};

export default CourseCreate;
