import { Router } from "express";

const router = Router();

const products = [
  {
    id: 1,
    title: "Remera",
    price: 90,
    thumbnail: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    title: "Short",
    price: 80,
    thumbnail: "https://picsum.photos/200",
  },
  {
    id: 3,
    title: "Chaqueta",
    price: 300,
    thumbnail: "https://picsum.photos/200/300",
  },
  {
    id: 4,
    title: "Pantalon",
    price: 140,
    thumbnail: "https://picsum.photos/200",
  },
];

router
  .route("/")
  .get((req, res) => {
    const response = {
      status: "Ok",
      data: products,
    };

    res.json(response);
  })
  .post((req, res) => {
    //Aca recibe y agrega un producto, y lo devuelve con su id asignado
    const { title, price, thumbnail } = req.body;

    const newProductId = products[products.length - 1].id + 1; // se le agrega el id

    // console.log(title);
    // console.log(req.body);

    const newProduct = {
      id: newProductId,
      title,
      price: Number(price),
      thumbnail,
    };

    const response = {
      status: "Created",
      data: newProduct,
    };

    products.push(newProduct);

    res.status(201).json(response);
  });

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    const product = products.find((product) => product.id === Number(id));

    const response = product
      ? { status: "Ok", data: product }
      : { error: "Producto  no encontrado", data: null };

    const statusCode = product ? 200 : 404;

    res.status(statusCode).json(response);
  })
  .put((req, res) => {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;
    const indexProductToUpdate = products.findIndex(
      (product) => product.id === Number(id)
    );

    if (indexProductToUpdate === -1) {
      return res.status(404).json({ status: "Not Found", data: null });
    }

    products.splice(indexProductToUpdate, 1, {
      id: Number(id),
      title,
      price,
      thumbnail,
    });

    res.status(200).json({
      status: "Updated",
      data: { id, title, price, thumbnail },
    });
  })
  .delete((req, res) => {
    const { id } = req.params;
    const indexProductToUpdate = products.findIndex(
      (product) => product.id === Number(id)
    );
    const productToDelete = products[indexProductToUpdate];

    if (!productToDelete) {
      return res.status(404).json({ status: "Not Found", data: null });
    }

    products.splice(indexProductToUpdate, 1);

    res.status(200).json({
      status: "Deleted",
      data: productToDelete,
    });
  });

export default router;
