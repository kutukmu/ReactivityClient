import { Dimmer, Loader } from "semantic-ui-react";

interface IProps {
  content?: string;
  inverted?: boolean;
}

const spinnerLoader = ({ content = "Loading", inverted = true }: IProps) => {
  return (
    <Dimmer active inverted={inverted}>
      <Loader inverted>{content}</Loader>
    </Dimmer>
  );
};

export default spinnerLoader;
