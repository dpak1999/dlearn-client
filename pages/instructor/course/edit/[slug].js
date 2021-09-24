/** @format */

import { useState, useEffect } from 'react';
import Resizer from 'react-image-file-resizer';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Avatar, List } from 'antd';
import CreateCourse from '../../../../components/forms/CreateCourse';
import InstructorRoute from '../../../../components/routes/InstructorRoute';

const CourseEdit = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    uploading: false,
    paid: true,
    loading: false,
    category: '',
    lessons: [],
  });

  const [image, setImage] = useState({});
  const [preview, setPreview] = useState('');
  const [uploadButtonText, setUploadButtonText] = useState('Upload Image');
  const router = useRouter();
  const { slug } = router.query;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImageRemove = async () => {
    try {
      setValues({ ...values, loading: true });
      const res = await axios.post('/api/course/remove-image', { image });
      setImage({});
      setPreview('');
      setUploadButtonText('Upload Image');
      setValues({ ...values, loading: false });
    } catch (error) {
      setValues({ ...values, loading: false });
      toast('Image upload failed. Try again');
    }
  };

  const handleImageUpload = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });

    Resizer.imageFileResizer(file, 720, 500, 'JPEG', 100, 0, async (uri) => {
      try {
        let { data } = await axios.post('/api/course/upload-image', {
          image: uri,
        });
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (error) {
        setValues({ ...values, loading: false });
        toast('Image upload failed. Try again');
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`/api/course/${slug}`, {
        ...values,
        image,
      });
      toast('Course updated');
      // router.push('/instructor');
    } catch (error) {
      toast(error.response.data);
    }
  };

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    if (data) setValues(data);
    if (data && data.image) setImage(data.image);
  };

  return (
    <InstructorRoute>
      <div className="p-5 mb-4 bg-primary bg-gradient">
        <div className="container-fluid py-5">
          <h1 className="text-center text-white">Edit course</h1>
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
          editPage={true}
        />
      </div>
      {/* <pre>{JSON.stringify(values, null, 4)}</pre>
      <pre>{JSON.stringify(image, null, 4)}</pre> */}

      <hr />
      <div className="row pb-5">
        <div className="col lesson-list">
          <h4>
            {values && values.lessons && values.lessons.length}{' '}
            {values && values.lessons && values.lessons.length > 1
              ? 'Lessons'
              : 'Lesson'}
          </h4>
          <List
            itemLayout="horizontal"
            dataSource={values && values.lessons}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                ></List.Item.Meta>
              </List.Item>
            )}
          ></List>
        </div>
      </div>
    </InstructorRoute>
  );
};

export default CourseEdit;
