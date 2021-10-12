/** @format */

import { Badge } from 'antd';
import ReactPlayer from 'react-player';
import { currencyFormatter } from '../../utils/helper';

const SingleCourseJumbotron = ({
  course: {
    name,
    description,
    category,
    instructor,
    updatedAt,
    image,
    price,
    paid,
    lessons,
  },
  showModal,
  setShowModal,
  preview,
  setPreview,
}) => {
  return (
    <div className="p-5 mb-4 bg-primary bg-gradient">
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-md-8 text-light">
            <h1 className="text-light font-weight-bold">{name}</h1>
            <p className="lead">
              {description && description.substring(0, 35)} ...
            </p>
            <Badge
              count={category}
              style={{ backgroundColor: '#03a9f4' }}
              className="pb-4 me-4"
            />
            <p>Created By {instructor.name}</p>
            <p>Last updated {new Date(updatedAt).toLocaleDateString()}</p>
            <h4 className="text-light">
              {paid
                ? currencyFormatter({ amount: price, currency: 'usd' })
                : 'Free'}
            </h4>
          </div>
          <div className="col-md-4">
            {lessons[0].video && lessons[0].video.Location ? (
              <div
                onClick={() => {
                  setPreview(lessons[0].video.Location);
                  setShowModal(!showModal);
                }}
              >
                <ReactPlayer
                  className="react-player-div"
                  url={lessons[0].video.Location}
                  light={image.Location}
                  width="100%"
                  height="250px"
                />
              </div>
            ) : (
              <>
                <img
                  src={image.Location}
                  alt={name}
                  className="img img-fluid"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourseJumbotron;