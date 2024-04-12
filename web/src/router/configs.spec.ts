import { configs } from "./configs";
import { isAuthenticated } from "@/services/authentication/authenticationService";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { RouteLocationNormalized, RouteRecordNormalized } from "vue-router";

vi.mock("pinia");
vi.mock("@/stores/authentication");
vi.mock("@/services/authentication/authenticationService");

const nextMock = vi.fn();
// TODO pull this out into a factory and make this signature not suck
const toMock: (requiresAuth: boolean | undefined) => RouteLocationNormalized & {
  matched: RouteRecordNormalized[];
} = (requiresAuth) => ({
  fullPath: "",
  hash: "",
  redirectedFrom: undefined,
  query: {},
  name: "",
  meta: {},
  path: "",
  params: {},
  matched: [
    {
      meta: requiresAuth ? { requiresAuth } : {},
      path: "",
      name: "",
      redirect: undefined,
      components: undefined,
      children: [],
      props: {},
      beforeEnter: undefined,
      leaveGuards: new Set(),
      updateGuards: new Set(),
      enterCallbacks: {},
      instances: {},
      aliasOf: undefined,
    },
  ],
});

describe("router config tests", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("unauthenticated state", () => {
    beforeEach(() => {
      vi.mocked(storeToRefs).mockReturnValue({
        isAuthenticated: computed(() => false),
      });
    });

    it("should redirect to auth page when user is not logged in", () => {
      // TODO once this has a factory remove the second toMock because this is just a bad default
      configs.beforeEach?.(toMock(true), toMock(undefined), nextMock);
      expect(nextMock).toHaveBeenCalledWith({ name: "auth" });
    });
  });

  describe("authenticated state", () => {
    beforeEach(() => {
      vi.mocked(storeToRefs).mockReturnValue({
        isAuthenticated: computed(() => true),
      });
    });

    it("should pass to destination when user is logged in", () => {
      vi.mocked(isAuthenticated).mockReturnValue(true);
      configs.beforeEach?.(toMock(true), toMock(undefined), nextMock);
      expect(nextMock).not.toHaveBeenCalledWith({ name: "auth" });
      expect(nextMock).toHaveBeenCalledWith();
    });

    it("should pass to destination if requiresAuth is not defined on route", () => {
      configs.beforeEach?.(toMock(undefined), toMock(undefined), nextMock);
      expect(nextMock).toHaveBeenCalledWith();
    });
  });
});
