import * as React from "react";
import "./App.css";

import { GreetRequest } from "./proto/greet_pb";
import { GreetServiceClient } from "./proto/GreetServiceClientPb";

const initialState = {
  inputText: "World",
  message: ""
};
type State = Readonly<typeof initialState>;

class App extends React.Component<{}, State> {
  public readonly state: State = initialState;

  public render() {
    return (
      <div className="App">
        <input
          type="text"
          value={this.state.inputText}
          onChange={this.onChange}
        />
        <button onClick={this.onClick}>Send</button>
        <p>{this.state.message}</p>
      </div>
    );
  }

  private onClick = () => {
    const request = new GreetRequest();
    request.setName(this.state.inputText);

    const client = new GreetServiceClient("http://localhost:8080", {}, {});
    client.greet(request, {}, (err, ret) => {
      if (err || ret === null) {
        throw err;
      }
      this.setState({ message: ret.getMessage() });
    });
  };

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputText: e.target.value });
  };
}

export default App;
