import { Loader } from "excalibur";
import { Images, Maps } from "./resources";

export const loader = new Loader();

loader.addResources(Object.values({ ...Maps, ...Images }));
