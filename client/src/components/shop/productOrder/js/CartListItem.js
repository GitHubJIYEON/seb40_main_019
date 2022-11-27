import '../css/cartListItem.scss';
// import QuantityBtn from '../../js/QuantityBtn';
import CartQuantityBtn from './CartQuantityBtn';

const CartListItem = ({
  item,
  decreaseQuantity,
  increaseQuantity,
  deleteItem,
  checkBuyItem,
}) => {
  return (
    <div className="cartListContainer">
      <button onClick={() => checkBuyItem(item)} className="checkbox">
        {item.check ? (
          <>
            <input type="checkbox" checked></input>
          </>
        ) : (
          <>
            <input type="checkbox"></input>
          </>
        )}
      </button>
      <img className="titleImg" src={item.titleImg} alt="productImg" />
      <div className="title">{item.title}</div>
      <div className="quantity">
        <CartQuantityBtn
          item={item}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
        />
      </div>
      <div className="price">
        <div>{item.price * item.count}원</div>
      </div>
      <div className="delete">
        <button onClick={() => deleteItem(item)}>
          <i className="fa-light fa-x"></i>
        </button>
      </div>
    </div>
  );
};

export default CartListItem;
