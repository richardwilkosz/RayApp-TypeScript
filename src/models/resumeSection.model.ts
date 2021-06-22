import { ButtonLinkData } from "./buttonLinkData.model";

export interface ResumeSection {
  id: number,
  title: string,
  img: string,
  body: string,
  buttons: Array<ButtonLinkData>
}