/** @format */
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SingleCourseJumbotron from '../../components/cards/SingleCourseJumbotron';
import SingleCourseLesson from '../../components/cards/SingleCourseLesson';
import PreviewModal from '../../components/modals/PreviewModal';

const SingleCourse = ({ course }) => {
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState('');
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <SingleCourseJumbotron
        course={course}
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
      />

      <PreviewModal
        preview={preview}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      {course.lessons && (
        <SingleCourseLesson
          lessons={course.lessons}
          setPreview={setPreview}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);
  return {
    props: {
      course: data,
    },
  };
}

export default SingleCourse;