// This is the main app file that will be launched once the site is initialized
import React, { useEffect, useState } from "react";
import "./App.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

// Creates the functional component
const App = (props) => {
  // This controls the state of the screen
  const [start, setStart] = useState(1000);
  const [additional, setAdditional] = useState(100);
  const [additionalType, setAdditionalType] = useState("Monthly");
  const [years, setYears] = useState(1);
  const [roi, setRoi] = useState(8.0);
  const [endAmount, setEndAmount] = useState(0);
  const [result, setResult] = useState(0);

  // Sets the initial amounts for the state
  useEffect(() => {
    calculateResult(
      0,
      start,
      additional,
      additionalType,
      years,
      roi,
      endAmount
    );
  }, []);

  // This formula is going to compound a specific amount over and over again for a set amount of
  // years
  const compound = (initialAmount, annualInterestRate, numYears) => {
    return (
      initialAmount * Math.pow(1 + annualInterestRate / 100 / 12, numYears * 12)
    );
  };

  // This is the method that will do the math based on the type of calculator that is currently being used
  const calculateResult = (
    type,
    start,
    additional,
    additionalType,
    years,
    roi,
    endAmount
  ) => {
    if (type === 0) {
      let endResult = compound(start, roi, years);
      if (additionalType === "Monthly") {
        const numMonths = years * 12;
        for (let i = 1; i <= numMonths; i++) {
          endResult += compound(additional, roi, years - i * (1 / 12));
        }
      } else {
        for (let i = 1; i <= years - 1; i++) {
          endResult += compound(additional, roi, years - i);
        }
      }
      setResult("$" + endResult.toFixed(0));
    } else if (type === 1) {

    } else if (type === 2) {

    } else if (type === 3) {
      
    }
  };

  // Stores the content area in a function so we don't have to code it twice
  const contentArea = (type) => {
    return (
      <div className={"contentAreaContainer"}>
        <div className={"contentAreaRow"}>
          <div>
            {type === 2 ? (
              <div>
                <div className={"inputTitleText"}>End Amount</div>
                <div className={"verticalSpacer"} />
                <div className={"inputContainer"}>
                  <button
                    className={"inputButton buttonLeft"}
                    onClick={() => {
                      if (endAmount >= 1000) {
                        calculateResult(
                          type,
                          start,
                          additional,
                          additionalType,
                          years,
                          roi,
                          endAmount - 1000
                        );
                        setEndAmount(endAmount - 1000);
                      }
                    }}
                  >
                    -
                  </button>
                  <div className={"inputTextContainer"}>
                    <div>$</div>
                    <input
                      className={"inputTextInput"}
                      type={"text"}
                      value={endAmount}
                      size={endAmount.toString().length}
                      onChange={(event) => {
                        if (event.target.value.trim() === "") {
                          setEndAmount(0);
                        } else {
                          setEndAmount(parseInt(event.target.value));
                        }
                        calculateResult(
                          type,
                          start,
                          additional,
                          additionalType,
                          years,
                          roi,
                          parseInt(event.target.value)
                        );
                      }}
                    />
                  </div>
                  <button
                    className={"inputButton buttonRight"}
                    onClick={() => {
                      calculateResult(
                        type,
                        start,
                        additional,
                        additionalType,
                        years,
                        roi,
                        endAmount + 1000
                      );
                      setEndAmount(endAmount + 1000);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className={"inputTitleText"}>Start Amount</div>
                <div className={"verticalSpacer"} />
                <div className={"inputContainer"}>
                  <button
                    onClick={() => {
                      if (start >= 100) {
                        calculateResult(
                          type,
                          start - 100,
                          additional,
                          additionalType,
                          years,
                          roi,
                          endAmount
                        );
                        setStart(start - 100);
                      }
                    }}
                    className={"inputButton buttonLeft"}
                  >
                    -
                  </button>
                  <div className={"inputTextContainer"}>
                    <div>$</div>
                    <input
                      className={"inputTextInput"}
                      size={start.toString().length}
                      type={"number"}
                      value={start}
                      onChange={(event) => {
                        if (event.target.value.trim() === "") {
                          setStart(0);
                        } else {
                          setStart(parseInt(event.target.value));
                        }

                        calculateResult(
                          type,
                          parseInt(event.target.value),
                          additional,
                          additionalType,
                          years,
                          roi,
                          endAmount
                        );
                      }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      calculateResult(
                        type,
                        start + 100,
                        additional,
                        additionalType,
                        years,
                        roi,
                        endAmount
                      );
                      setStart(start + 100);
                    }}
                    className={"inputButton buttonRight"}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            {type === 1 ? (
              <div>
                <div className={"inputTitleText"}>Contribution Frequency</div>
                <div className={"dropdownContainer"}>
                  <Dropdown
                    options={["Monthly", "Annually"]}
                    onChange={(value) => {
                      setAdditionalType(value.value);
                      calculateResult(
                        type,
                        start,
                        additional,
                        value.value,
                        years,
                        roi,
                        endAmount
                      );
                    }}
                    value={additionalType}
                    placeholder="Select an option"
                  />
                </div>
                <div className={"inputTitleText"}>End Amount</div>
                <div className={"verticalSpacer"} />
                <div className={"inputContainer"}>
                  <button
                    className={"inputButton buttonLeft"}
                    onClick={() => {
                      if (endAmount >= 1000) {
                        calculateResult(
                          type,
                          start,
                          additional,
                          additionalType,
                          years,
                          roi,
                          endAmount - 1000
                        );
                        setEndAmount(endAmount - 1000);
                      }
                    }}
                  >
                    -
                  </button>
                  <div className={"inputTextContainer"}>
                    <div>$</div>
                    <input
                      className={"inputTextInput"}
                      type={"number"}
                      value={endAmount}
                      size={endAmount.toString().length}
                      onChange={(event) => {
                        if (event.target.value.trim() === "") {
                          setEndAmount(0);
                        } else {
                          setEndAmount(parseInt(event.target.value));
                        }

                        calculateResult(
                          type,
                          start,
                          additional,
                          additionalType,
                          years,
                          roi,
                          event.target.value
                        );
                      }}
                    />
                  </div>
                  <button
                    className={"inputButton buttonRight"}
                    onClick={() => {
                      calculateResult(
                        type,
                        start,
                        additional,
                        additionalType,
                        years,
                        roi,
                        endAmount + 1000
                      );
                      setEndAmount(endAmount + 1000);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className={"inputTitleText"}>Additional Contribution</div>
                <div className={"verticalSpacer"} />
                <div className={"row"}>
                  <div className={"inputContainer"}>
                    <button
                      className={"inputButton buttonLeft"}
                      onClick={() => {
                        if (additional >= 50) {
                          calculateResult(
                            type,
                            start,
                            additional - 50,
                            additionalType,
                            years,
                            roi,
                            endAmount
                          );
                          setAdditional(additional - 50);
                        }
                      }}
                    >
                      -
                    </button>
                    <div className={"inputTextContainer"}>
                      <div>$</div>
                      <input
                        className={"inputTextInput"}
                        type={"text"}
                        size={additional.toString().length}
                        value={additional}
                        onChange={(event) => {
                          if (event.target.value.trim() === "") {
                            setAdditional(0);
                          } else {
                            setAdditional(parseInt(event.target.value));
                          }
                          calculateResult(
                            type,
                            start,
                            event.target.value,
                            additionalType,
                            years,
                            roi,
                            endAmount
                          );
                        }}
                      />
                    </div>
                    <button
                      className={"inputButton buttonRight"}
                      onClick={() => {
                        calculateResult(
                          type,
                          start,
                          additional + 50,
                          additionalType,
                          years,
                          roi,
                          endAmount
                        );
                        setAdditional(additional + 50);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <Dropdown
                    options={["Monthly", "Annually"]}
                    onChange={(value) => {
                      setAdditionalType(value.value);
                      calculateResult(
                        type,
                        start,
                        additional,
                        value.value,
                        years,
                        roi,
                        endAmount
                      );
                    }}
                    value={additionalType}
                    placeholder="Select an option"
                  />
                </div>
              </div>
            )}

            <div className={"inputTitleText"}>Number of Years</div>
            <div className={"verticalSpacer"} />
            <div className={"inputContainer"}>
              <button
                className={"inputButton buttonLeft"}
                onClick={() => {
                  if (years >= 1) {
                    calculateResult(
                      type,
                      start,
                      additional,
                      additionalType,
                      years - 1,
                      roi,
                      endAmount
                    );
                    setYears(years - 1);
                  }
                }}
              >
                -
              </button>
              <div className={"inputTextContainer"}>
                <input
                  className={"inputTextInput"}
                  type={"text"}
                  value={years}
                  size={years.toString().length}
                  onChange={(event) => {
                    if (event.target.value.trim() === "") {
                      setYears(0);
                    } else {
                      setYears(parseInt(event.target.value));
                    }

                    calculateResult(
                      type,
                      start,
                      additional,
                      additionalType,
                      event.target.value,
                      roi,
                      endAmount
                    );
                  }}
                />
              </div>
              <button
                className={"inputButton buttonRight"}
                onClick={() => {
                  calculateResult(
                    type,
                    start,
                    additional,
                    additionalType,
                    years + 1,
                    roi,
                    endAmount
                  );
                  setYears(years + 1);
                }}
              >
                +
              </button>
            </div>
            {type === 3 ? (
              <div>
                <div className={"inputTitleText"}>End Amount</div>
                <div className={"verticalSpacer"} />
                <div className={"inputContainer"}>
                  <button
                    className={"inputButton buttonLeft"}
                    onClick={() => {
                      if (endAmount >= 1000) {
                        calculateResult(
                          type,
                          start,
                          additional,
                          additionalType,
                          years,
                          roi,
                          endAmount - 1000
                        );
                        setEndAmount(endAmount - 1000);
                      }
                    }}
                  >
                    -
                  </button>
                  <div className={"inputTextContainer"}>
                    <div>$</div>
                    <input
                      className={"inputTextInput"}
                      type={"text"}
                      value={endAmount}
                      size={endAmount.toString().length}
                      onChange={(event) => {
                        if (event.target.value.trim() === "") {
                          setEndAmount(0);
                        } else {
                          setEndAmount(parseInt(event.target.value));
                        }

                        calculateResult(
                          type,
                          start,
                          additional,
                          additionalType,
                          years,
                          roi,
                          event.target.value
                        );
                      }}
                    />
                  </div>
                  <button
                    className={"inputButton buttonRight"}
                    onClick={() => {
                      calculateResult(
                        type,
                        start,
                        additional,
                        additionalType,
                        years,
                        roi,
                        endAmount + 1000
                      );
                      setEndAmount(endAmount + 1000);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className={"inputTitleText"}>Annual Rate of Return</div>
                <div className={"verticalSpacer"} />
                <div className={"inputContainer"}>
                  <button
                    className={"inputButton buttonLeft"}
                    onClick={() => {
                      if (roi >= 0.25) {
                        calculateResult(
                          type,
                          start,
                          additional,
                          additionalType,
                          years,
                          roi - 0.25,
                          endAmount
                        );
                        setRoi(roi - 0.25);
                      }
                    }}
                  >
                    -
                  </button>
                  <div className={"inputTextContainer"}>
                    <input
                      className={"inputTextInput"}
                      type={"text"}
                      value={roi.toFixed(2)}
                      size={roi.toFixed(2).toString().length}
                      onChange={(event) => {
                        if (event.target.value.trim() === "") {
                          setRoi(0);
                        } else {
                          setRoi(parseFloat(event.target.value));
                        }

                        calculateResult(
                          type,
                          start,
                          additional,
                          additionalType,
                          years,
                          event.target.value,
                          endAmount
                        );
                      }}
                    />
                    <div>%</div>
                  </div>
                  <button
                    className={"inputButton buttonRight"}
                    onClick={() => {
                      calculateResult(
                        type,
                        start,
                        additional,
                        additionalType,
                        years,
                        roi + 0.25,
                        endAmount
                      );
                      setRoi(roi + 0.25);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className={"resultSection"}>
            <div className={"resultTitleText"}>Result</div>
            <div className={"inputTitleText"}>
              {type === 0
                ? "End Amount"
                : type === 1
                ? "Contribution Amount"
                : type === 2
                ? "Start Amount"
                : "Annual Rate of Return"}
            </div>
            <div className={"verticalSpacer"} />
            <div className={"inputContainer"}>
              <div className={"inputButton buttonLeft"} />
              <div className={"inputTextContainer"}>
                <div className={"inputTextInput"}>{result}</div>
              </div>
              <div className={"inputButton buttonRight"} />
            </div>
          </div>
        </div>
        <div className={"verticalSpacer"} />
        <div className={"verticalSpacer"} />
      </div>
    );
  };

  return (
    <div className={"container"}>
      <div className={"titleText"}>Compounding Returns Calculator</div>
      <div className={"tabsContainer"}>
        <Tabs>
          <TabList>
            <Tab>
              <div className={"tabText"}>How much will I have?</div>
            </Tab>
            <Tab>
              <div className={"tabText"}>How much do I need to contribute?</div>
            </Tab>
            <Tab>
              <div className={"tabText"}>How much do I need to start?</div>
            </Tab>{" "}
            <Tab>
              <div className={"tabText"}>What rate of return do I need?</div>
            </Tab>
          </TabList>
          <TabPanel>{contentArea(0)}</TabPanel>
          <TabPanel>{contentArea(1)}</TabPanel>
          <TabPanel>{contentArea(2)}</TabPanel>
          <TabPanel>{contentArea(3)}</TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

// Exports the component
export default App;
