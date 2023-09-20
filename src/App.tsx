import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";

// import ListGroup from "./components/ListGroup";
function App() {
  // const items = ["Sydney", "Wollongong", "Newcastle"];

  // const handleSelectItem = (item: string) => {
  //   console.log(item);
  // };

  let [alertVisible, setAlertVisible] = useState(false);
  return (
    <div>
      {/* <ListGroup
        items={items}
        heading="Australian Cities"
        onSelectItem={handleSelectItem}
      /> */}
      {alertVisible && (
        <Alert onClose={() => setAlertVisible(false)}>
          hello <span>world</span>
        </Alert>
      )}
      <Button colour="green" onButtonClicked={() => setAlertVisible(true)}>
        hello <span>button</span>
      </Button>
    </div>
  );
}
export default App;
