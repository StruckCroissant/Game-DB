type ActionCallback = () => unknown | Promise<unknown>;

export type Assertions = {
  shouldBeVisible: () => ActionCallback;
  shouldHaveAttribute: (
    name: string,
    value?: string | RegExp
  ) => ActionCallback;
};

export type AssertionsNot = {
  shouldNotBeVisible: () => ActionCallback;
  shouldNotExist: () => ActionCallback;
};

export type Interactions = {
  check: () => ActionCallback;
  click: () => ActionCallback;
  type: (text: string) => ActionCallback;
};

type FindByLabelText = (text: string) => Interactions & Assertions;

type Role = "button" | "link" | "option" | "tab";

type FindByRoleOptions = {
  name: string;
};

type FindByRole = (
  role: Role,
  options: FindByRoleOptions
) => Interactions & Assertions;

type FindByTextOptions = {
  withinTestId?: string;
};

type FindByText = (text: string, options?: FindByTextOptions) => Assertions;

type FindAllByText = (text: string, options?: FindByTextOptions) => Assertions;

type QueryByText = (text: string, options?: FindByTextOptions) => AssertionsNot;

type GoToOptions = {
  device?: "desktop" | "mobile";
};

type GoTo = (path: string, options?: GoToOptions) => ActionCallback;

type MockEndpointOptions = {
  body: string | unknown[] | Record<string | number, unknown>;
  method?: "get" | "post" | "patch" | "put" | "delete";
  status?: number;
};

type MockEndpoint = (path: string, options: MockEndpointOptions) => void;

type Context = {
  localStorage: Storage;
};

export type SetupFactoryOptions = {
  context: Context;
  driver: Driver;
};

type SetupFactory = (factory: Driver) => any;

type SetUp = <Factory extends SetupFactory>(
  factory: Factory
) => Promise<ReturnType<Factory>>;

export type Driver = {
  findAllByText: FindAllByText;
  findByLabelText: FindByLabelText;
  findByRole: FindByRole;
  findByText: FindByText;
  goTo: GoTo;
  mockEndpoint: MockEndpoint;
  setUp: SetUp;
  queryByText: QueryByText;
};

type Step =
  | (() => unknown | void)
  | (({ driver }: { driver: Driver }) => Step[]);

export type ItCallback = ({ driver }: { driver: Driver }) => Step[];
