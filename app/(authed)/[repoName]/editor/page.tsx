import { Badge } from "@/components/ui/badge";

export default function EditorPage() {
  return (
    <div className="flex flex-col flex-1 px-4 md:px-6 lg:px-8">
      <h1 className="mt-8 mb-12 text-center text-6xl font-manrope font-bold tracking-[-0.02em]">
        Changelog
      </h1>
      <div className="flex items-start">
        <p className="text-sm font-semibold text-muted-foreground pe-4">
          February 28, 2025
        </p>
        <span className="bg-teal-500 w-4 h-4 shrink-0 rounded-full border-4 border-teal-100 translate-x-1/2" />

        <div className="ps-8 pb-14 border-l space-y-4">
          <h2 className="mt-2 mb-8 text-2xl tracking-[-0.02em] font-manrope font-bold text-black leading-0">
            2025-02-24.acacia
          </h2>
          <div>
            <h3 className="mb-2 text-md font-semibold font-manrope">
              Improved workflows for Checkout Sessions
            </h3>
            <ul className="text-sm pl-4 list-disc text-muted-foreground leading-[1.5em]">
              <li>
                Adds support for blocking specific card brands in Checkout
                Sessions
              </li>
              <li>
                Checkout sessions now group customer information in one field
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-md font-semibold font-manrope">
              More granular control of credit grants
            </h3>
            <ul className="text-sm pl-4 list-disc text-muted-foreground leading-[1.5em]">
              <li>
                Adds support for blocking specific card brands in Checkout
                Sessions
              </li>
              <li>
                Checkout sessions now group customer information in one field
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-md font-semibold font-manrope">
              More flexibility for buy now, pay later methods
            </h3>
            <ul className="text-sm pl-4 list-disc text-muted-foreground leading-[1.5em]">
              <li>
                Adds support for blocking specific card brands in Checkout
                Sessions
              </li>
              <li>
                Checkout sessions now group customer information in one field
              </li>
            </ul>
          </div>
          <div className="flex items-center">
            <Badge variant="secondary" className="text-xs py-1.5">
              NEW FEATURE
            </Badge>
            <p className="px-4 text-xs">Product</p>
          </div>
        </div>
      </div>
      <div className="flex items-start">
        <p className="text-sm font-semibold text-muted-foreground pe-4">
          February 28, 2025
        </p>
        <span className="bg-cyan-500 w-4 h-4 shrink-0 rounded-full border-4 border-cyan-100 translate-x-1/2" />

        <div className="ps-8 pb-8 border-l space-y-4">
          <h2 className="mt-2 mb-8 text-2xl tracking-[-0.02em] font-manrope font-bold text-black leading-0">
            2025-02-24.acacia
          </h2>
          <div>
            <h3 className="mb-2 text-md font-semibold font-manrope">
              Improved workflows for Checkout Sessions
            </h3>
            <ul className="text-sm pl-4 list-disc text-muted-foreground leading-[1.5em]">
              <li>
                Adds support for blocking specific card brands in Checkout
                Sessions
              </li>
              <li>
                Checkout sessions now group customer information in one field
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-md font-semibold font-manrope">
              More granular control of credit grants
            </h3>
            <ul className="text-sm pl-4 list-disc text-muted-foreground leading-[1.5em]">
              <li>
                Adds support for blocking specific card brands in Checkout
                Sessions
              </li>
              <li>
                Checkout sessions now group customer information in one field
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-md font-semibold font-manrope">
              More flexibility for buy now, pay later methods
            </h3>
            <ul className="text-sm pl-4 list-disc text-muted-foreground leading-[1.5em]">
              <li>
                Adds support for blocking specific card brands in Checkout
                Sessions
              </li>
              <li>
                Checkout sessions now group customer information in one field
              </li>
            </ul>
          </div>
          <div className="flex items-center">
            <Badge variant="secondary" className="text-xs py-1.5">
              NEW FEATURE
            </Badge>
            <p className="px-4 text-xs">Product</p>
          </div>
        </div>
      </div>
    </div>
  );
}
