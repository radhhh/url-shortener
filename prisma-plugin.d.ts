declare module "@prisma/nextjs-monorepo-workaround-plugin" {
  import type { WebpackPluginInstance, Compiler } from "webpack";

  export class PrismaPlugin implements WebpackPluginInstance {
    apply(compiler: Compiler): void;
  }
}