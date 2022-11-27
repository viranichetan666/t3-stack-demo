  import { FC } from "react";
  import {List} from "react-content-loader";

  interface LoaderProps {}

  const Loader: FC<LoaderProps> = () => (
   <div className="p-5">
    <List/>
   </div>
  );

  export default Loader;
