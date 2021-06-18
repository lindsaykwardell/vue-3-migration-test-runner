import { mount } from "@vue/test-utils";
import Tester from "@/components/Tester/Tester.vue";
import Vue from "vue";

describe("Tester.vue", () => {
  it("renders without error", () => {
    const wrapper = mount(Tester);
    expect(wrapper.vm).toBeTruthy();
  });

  it("renders a start test button", () => {
    const wrapper = mount(Tester);

    expect(wrapper.find(".start-test-button").element).toBeTruthy();
  });

  it("renders a list of tests", async () => {
    const wrapper = mount(Tester);
    await Vue.nextTick();

    const testList = wrapper.findAll(".test").length;

    expect(testList).toEqual(6);
  });

  it("begins the tests when clicked", async () => {
    const wrapper = mount(Tester);

    await wrapper.find(".start-test-button").trigger("click");

    expect(wrapper.find(".tests-passed").element).toBeTruthy();
  });

  it("displays a spinner while test is running", async () => {
    const wrapper = mount(Tester);
    const beforeSpinnerCount = wrapper.findAll(".test .spinner").length;

    expect(beforeSpinnerCount).toEqual(0);

    await wrapper.find(".start-test-button").trigger("click");

    const afterSpinnerCount = wrapper.findAll(".test .spinner").length;

    expect(afterSpinnerCount).toEqual(6);
  });

  it("displays end test message when done", async () => {
    jest.setTimeout(25000)

    const wrapper = mount(Tester);
    await wrapper.find(".start-test-button").trigger("click");

    await waitFor(20000)

    await Vue.nextTick()

    expect(wrapper.find(".tests-complete").element).toBeTruthy()
  });
});

const waitFor = (timeout) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, timeout)
  );
