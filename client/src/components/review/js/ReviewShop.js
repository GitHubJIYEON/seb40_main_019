import '../css/ReviewShop.scss';
import ReviewStar from '../../review/js/ReviewStar';

export default function ReviewShop({ item }) {
  return (
    <div className="reviewContainer">
      <div>
        <h2>{item.reviewWriter}</h2>
        <p>{item.createdAt}</p>
        <ReviewStar clickStar={item.star} type={'small'} />
        <div className="reviewImg">
          {item.reviewImg && <img src={item.reviewImg} alt="reviewImg" />}
        </div>
        <h2>{item.reviewContent}</h2>
      </div>
    </div>
  );
}
