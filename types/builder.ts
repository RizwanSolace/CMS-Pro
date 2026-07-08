export interface BuilderBlock {
  id: string;
  type: "heading" | "paragraph" | "image" | "button" | "hero";
  content?: string;
   styles: {
    fontSize?: number;
    color?: string;
    align?: "left" | "center" | "right";
    image?: string;
    buttonLink?: string;
  };
}