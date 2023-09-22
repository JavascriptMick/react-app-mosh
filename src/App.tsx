import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";

import ListGroup from "./components/ListGroup";

import { AiFillAlert, AiFillPlaySquare } from "react-icons/ai";
import Like from "./components/Like/Like";
import ExpandableText from "./components/ExpandableText";

function App() {
  // Listgroup Example
  const items = ["Sydney", "Wollongong", "Newcastle"];
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  // Alert show/hide example
  let [alertVisible, setAlertVisible] = useState(false);

  //Game Example
  let [likeVisible, setLikeVisible] = useState(false);
  const [game, setGame] = useState({
    id: 1,
    player: {
      name: "john",
    },
  });

  const handleGameClick = () => {
    setGame({ ...game, player: { ...game.player, name: "Bob" } });
  };

  // Pizza Example
  const [pizza, setPizza] = useState({
    name: "Pepperoni",
    toppings: ["Mushroom"],
  });

  const handleAddTopping = () => {
    setPizza({ ...pizza, toppings: [...pizza.toppings, "Pineaple"] });
  };

  // Shopping Cart Example
  const [cart, setCart] = useState({
    discount: 0.1,
    items: [
      {
        id: 1,
        title: "Product 1",
        quantity: 1,
      },
      {
        id: 2,
        title: "Product 2",
        quantity: 1,
      },
    ],
  });

  const handleCartClick = () => {
    setCart({
      ...cart,
      items: cart.items.map((item) =>
        item.id === 1 ? { ...item, quantity: 2 } : item
      ),
    });
  };

  return (
    <div>
      <hr />
      <h1>ListGroup Example</h1>
      <p>Click to select</p>
      <ListGroup
        items={items}
        heading="Australian Cities"
        onSelectItem={handleSelectItem}
      />
      <hr />
      <h1>Just an Icon</h1>
      <AiFillAlert color="blue" size={78} />
      <hr />
      <h1>Alert Show Hide Example</h1>
      <p>Alert looks silly without Bootstrap</p>
      {alertVisible && (
        <Alert onClose={() => setAlertVisible(false)}>
          hello <span>world</span>
        </Alert>
      )}
      <Button colour="red" onButtonClicked={() => setAlertVisible(true)}>
        hello <span>button</span>
      </Button>
      <hr />
      <h1>Like Button Example</h1>
      <p>
        Note that component state is lost as soon as it is no longer visible
      </p>
      {likeVisible && <Like size={22} onClick={() => console.log("clicked")} />}
      <Button
        colour="green"
        onButtonClicked={() => setLikeVisible(!likeVisible)}
      >
        toggle like button vis
      </Button>

      <hr />
      <h1>Game Example</h1>
      <p>player name: {game.player.name}</p>
      <Button colour="green" onButtonClicked={() => handleGameClick()}>
        Change Player Name to Bob
      </Button>

      <hr />
      <h1>Pizza Example</h1>
      <p>Pizza name: {pizza.name}</p>
      <p>
        Toppings:{" "}
        {pizza.toppings.map((topping) => (
          <span key={topping}>{topping}&nbsp;</span>
        ))}
      </p>
      <Button colour="green" onButtonClicked={() => handleAddTopping()}>
        Add a topping
      </Button>

      <hr />
      <h1>Cart Example</h1>
      <p>Discount: {cart.discount}</p>
      <div>
        items:{" "}
        {cart.items.map((item) => (
          <p key={item.id}>id: {item.id}, title: {item.title}, quantity: {item.quantity}</p>
        ))}
      </div>
      <Button colour="yellow" onButtonClicked={() => handleCartClick()}>
        update quantity on item 1
      </Button>

      <hr />
      <h1>Expandable Text Example</h1>
      <ExpandableText maxChars={45}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, dolor illum! Dolorem veritatis quae aut provident facere nobis numquam, impedit eligendi molestias consequuntur, quos vel deserunt, magnam pariatur amet neque.</ExpandableText>

    </div>
  );
}
export default App;
