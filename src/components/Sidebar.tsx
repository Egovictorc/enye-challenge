import React, {
  useState,
  useEffect,
  HtmlHTMLAttributes,
  FormEvent,
  ChangeEvent,
} from "react";
import { Layout, Col } from "antd";

import styles from "../scss/sidebar.module.scss";


interface State {
    radius: number;
    place: string
  }


const Sidebar: React.FC = () => {
  const [state, setState] = useState<State>({
    radius: 0,
    place: "",
  });

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Col span="6">
      hello from sidebar
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="radius"> radius {state.radius} km </label>
          <input
            type="range"
            name="radius"
            onChange={handleChange}
            value={state.radius}
          />
        </div>

        <div>
          <label htmlFor="place"> radius {state.radius} km </label>
          <input
            type="range"
            name="radius"
            onChange={handleChange}
            value={state.radius}
          />
        </div>
      </form>
    </Col>
  );
};

export default Sidebar;
