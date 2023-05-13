import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "My First App",
    price: 6,
    description: "The first app I've ever developed"
  },
  {
    id: "p2",
    title: "My Second App",
    price: 6,
    description: "The second app I've ever developed"
  }
]

const Products = (props) => {

  const productItemContent = DUMMY_PRODUCTS.map((prod) => {
    return (
      <ProductItem
        key={prod.id}
        id={prod.id}
        title={prod.title}
        price={prod.price}
        description={prod.description}
      />
    )
  })

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {productItemContent}
      </ul>
    </section>
  );
};

export default Products;
