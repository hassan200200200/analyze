import React, { Component } from "react";
import {
  VictoryPie,
  VictoryBar,
  VictoryChart,
  VictoryBrushContainer,
  VictoryLabel,
  VictoryAxis
} from "victory";

class OrderCountCharts extends Component {
  state = {
    clickedBar: [],
    clickedPieSlice: []
  };
  handleChange = (domain, props) => {
    this.props.handleChartChange(domain.x, props.name);
    console.log(domain.x)
  };

  handleBranchBarClick = () => {
    setTimeout(() => {
      this.props.handleBranchBarClick(this.state.clickedBar);
    }, 10);
  };

  handlePieSliceClick = () => {
    setTimeout(() => {
      this.props.handlePieSliceClick(this.state.clickedPieSlice);
    }, 100);
  };

  handleResetClick = e => {
    if (e.target.text === "Reset All") {
      this.props.resetAll();
    } else {
      this.props.resetDim(e.target.parentElement.id);
    }
  };


  render() {
    return (
      <div className="card-container">
        <div id="orderCount-paymentMethod" className="card-def card-sm">
          <h2>Orders Count / Payment Method</h2>
          <br />
          <br />
          <div className="btn-group">
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset All
            </a>
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset Dimension
            </a>
          </div>

          <VictoryPie
            className="pie"
            name="payMethodPieChart"
            responsive={false}
            data={this.props.paymentMethodDim
              .group()
              .all()
              .map(paymentMethod => {
                return { y: paymentMethod.value, label: paymentMethod.key };
              })}
            height={280}
            width={280}
            colorScale={["#3d3d42", "#008f68", "#EFBB35"]}
            labelRadius={120}
            style={{ labels: { fill: "transparent", fontSize: 10 } }}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "labels",
                        mutation: props => {
                          if (this.state.clickedPieSlice.includes(props.text)) {
                            this.setState(prevState => ({
                              clickedPieSlice: prevState.clickedPieSlice.filter(
                                slice => slice !== props.text
                              )
                            }));
                            this.handlePieSliceClick();
                          } else {
                            this.setState(prevState => ({
                              clickedPieSlice: prevState.clickedPieSlice.concat(
                                props.text
                              )
                            }));
                            this.handlePieSliceClick();
                          }
                        }
                      },
                      {
                        target: "data",
                        mutation: props => {
                          return props.style.fill === "#4c4c82"
                            ? props.style.fill
                            : { style: { fill: "#4c4c82" } };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          />
          <div className="labels-container">
            <div id="box-1" />
            <div className="label-1">Cash</div>
            <div id="box-2" />
            <div className="label-2">Credit Card</div>
            <div id="box-3" />
            <div className="label-3">KNET</div>
          </div>
        </div>
        <div id="orderCount-orderTime" className="card-def card-sm">
          <h2>Orders Count / Order Time</h2>
          <br />
          <br />
          <div className="btn-group">
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset All
            </a>
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset Dimension
            </a>
          </div>
          <VictoryPie
            responsive={false}
            data={[
              {
                y:
                  this.props.orderTimeDim.group(d => d >= 6).all()[1].value -
                  this.props.orderTimeDim.group(d => d >= 12).all()[1].value,
                label: [6, 8, 8, 12]
              },
              {
                y:
                  this.props.orderTimeDim.group(d => d >= 12).all()[1].value -
                  this.props.orderTimeDim.group(d => d >= 17).all()[1].value,
                label: [12, 14, 14, 17]
              },
              {
                y:
                  this.props.orderTimeDim.group(d => d >= 17).all()[1].value -
                  this.props.orderTimeDim.group(d => d >= 20).all()[1].value,
                label: [17, 18, 18, 20]
              },
              {
                y:
                  this.props.orderTimeDim.group(d => d >= 20).all()[1].value +
                  this.props.orderTimeDim.group(d => d >= 6).all()[0].value,
                label: [20, 24, 0, 6]
              }
            ]}
            height={280}
            width={280}
            colorScale={["#c8e7b0", "#3d3d42", "#4db7ce", "#008f68"]}
            labelRadius={120}
            style={{ labels: { fill: "transparent", fontSize: 10 } }}
            animate={{
              duration: 2000,
              onLoad: { duration: 3000 }
            }}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "labels",
                        mutation: props => {
                          if (
                            this.state.clickedPieSlice.find(
                              slice => slice[0] === props.datum.label[0]
                            ) === undefined
                          ) {
                            this.state.clickedPieSlice.push(props.datum.label);
                            this.setState({
                              clickedPieSlice: this.state.clickedPieSlice
                            });

                            this.handlePieSliceClick();
                          } else {
                            this.setState(prevState => ({
                              clickedPieSlice: prevState.clickedPieSlice.filter(
                                slice => slice[0] !== props.datum.label[0]
                              )
                            }));
                            this.handlePieSliceClick();
                          }
                        }
                      },
                      {
                        target: "data",
                        mutation: props => {
                          return props.style.fill === "#4c4c82"
                            ? "blue"
                            : { style: { fill: "#4c4c82" } };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          />
          <div className="labels-container-orderTime">
            <div id="box-1-orderTime" />
            <div className="label-1-orderTime">Morning</div>
            <div id="box-2-orderTime" />
            <div className="label-2-orderTime">Afternoon</div>
            <div id="box-3-orderTime" />
            <div className="label-3-orderTime">Evening</div>
            <div id="box-4-orderTime" />
            <div className="label-4-orderTime">Night</div>
          </div>
        </div>
        <div id="orderCount-branch" className="card-def card-md">
          <h2>Orders Count / Branch</h2>
          <br />
          <br />
          <div className="btn-group">
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset All
            </a>
          </div>
          <VictoryChart
            responsive={false}
            domainPadding={11}
            padding={{ left: 80, right: 60 }}
            width={400}
            height={140}
          >
            <VictoryBar
              horizontal
              labelComponent={
                <VictoryLabel
                  verticalAnchor="middle"
                  textAnchor="start"
                  desc="Order Count per branch chart"
                />
              }
              data={this.props.branchDim
                .group()
                .all()
                .map(branch => {
                  return {
                    y: branch.value,
                    x: branch.key,
                    label: branch.value + " Orders"
                  };
                })}
              style={{
                data: { fill: "#008f68" },
                labels: { fill: "#666", fontSize: 10 }
              }}
              animate={{
                duration: 500,
                onLoad: { duration: 800 }
              }}
              barWidth={21}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onClick: () => {
                      return [
                        {
                          target: "labels",
                          mutation: props => {
                            if (this.state.clickedBar.includes(props.datum.x)) {
                              this.setState(prevState => ({
                                clickedBar: prevState.clickedBar.filter(
                                  branch => branch !== props.datum.x
                                )
                              }));
                              this.handleBranchBarClick();
                            } else {
                              this.setState(prevState => ({
                                clickedBar: prevState.clickedBar.concat(
                                  props.datum.x
                                )
                              }));
                              this.handleBranchBarClick();
                            }
                          }
                        },
                        {
                          target: "data",
                          mutation: props => {
                            return props.style.fill === "#4c4c82"
                              ? "blue"
                              : { style: { fill: "#4c4c82" } };
                          }
                        }
                      ];
                    }
                  }
                }
              ]}
            />
          </VictoryChart>
        </div>
        <div id="orderCount-deliveryArea" className="card-def card-40">
          <h2>Orders Count / Delivery Area</h2>
          <br />
          <br />
          <div className="btn-group">
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset All
            </a>
          </div>
          <VictoryChart
            responsive={false}
            containerComponent={
              <VictoryBrushContainer
                brushDimension="x"
                brushDomain={{ x: [6, 14] }}
                defaultBrushArea={"all"}
                onBrushDomainChange={this.handleChange}
                handleStyle={{stroke: "transparent", strokeWidth:1, fill: "#000", fillOpacity: ".5"}}
                brushStyle={{
                  stroke: "transparent",
                  fill: "#999",
                  fillOpacity: 0.3
                }}
                name="deliverAreaChart"
              />
            }
            domainPadding={9}
          >
            <VictoryBar
              data={this.props.deliveryAreaDim
                .group()
                .top(20)
                .map(order => {
                  return { y: order.value, x: order.key.substr(0, 8) };
                })}
              style={{
                data: { fill: (d, active) => (active ? "grey" : "#33619D") },
                labels: { fill: "#888", fontSize: 10 }
              }}
              barWidth={17}
              animate={{
                duration: 500,
                onLoad: { duration: 800 }
              }}
            />
            <VictoryAxis
              style={{ tickLabels: { angle: -70, fontSize: 12, padding: 25 } }}
            />
            <VictoryAxis dependentAxis />
          </VictoryChart>
        </div>
        
        <div id="orderCount-orderSize" className="card-def card-25">
          <h2>Orders Count / Order Size</h2>
          <br />
          <br />
          <div className="btn-group">
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset All
            </a>
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset Dimension
            </a>
          </div>
          <VictoryPie
            responsive={false}
            data={[
              {
                y: this.props.orderAmountDim.group(d => d >= 10).all()[0].value,
                label: [0, 10]
              },
              {
                y:
                  this.props.orderAmountDim.group(d => d >= 10).all()[1].value -
                  this.props.orderAmountDim.group(d => d >= 20).all()[1].value,
                label: [10, 20]
              },
              {
                y:
                  this.props.orderAmountDim.group(d => d >= 20).all()[1].value -
                  this.props.orderAmountDim.group(d => d >= 40).all()[1].value,
                label: [20, 40]
              },
              {
                y:
                  this.props.orderAmountDim.group(d => d >= 40).all()[1].value -
                  this.props.orderAmountDim.group(d => d >= 70).all()[1].value,
                label: [40, 70]
              },
              {
                y: this.props.orderAmountDim.group(d => d >= 70).all()[1].value,
                label: [70, 1000000]
              }
            ]}
            height={280}
            width={280}
            colorScale={["#c8e7b0", "#3d3d42", "#4db7ce", "#008f68", "#EFBB35"]}
            labelRadius={120}
            innerRadius={50}
            style={{ labels: { fill: "transparent", fontSize: 10 } }}
            animate={{
              duration: 500,
              onLoad: { duration: 800 }
            }}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "labels",
                        mutation: props => {
                          if (
                            this.state.clickedPieSlice.find(
                              slice => slice[0] === props.datum.label[0]
                            ) === undefined
                          ) {
                            this.state.clickedPieSlice.push(props.datum.label);
                            this.setState({
                              clickedPieSlice: this.state.clickedPieSlice
                            });

                            this.handlePieSliceClick();
                          } else {
                            this.setState(prevState => ({
                              clickedPieSlice: prevState.clickedPieSlice.filter(
                                slice => slice[0] !== props.datum.label[0]
                              )
                            }));
                            this.handlePieSliceClick();
                          }
                        }
                      },
                      {
                        target: "data",
                        mutation: props => {
                          return props.style.fill === "#4c4c82"
                            ? "blue"
                            : { style: { fill: "#4c4c82" } };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          />
          <div className="labels-container-orderAmount">
            <div id="box-1-orderAmount" />
            <div className="label-1-orderAmount">Less than $10</div>
            <div id="box-2-orderAmount" />
            <div className="label-2-orderAmount">$10 - $20</div>
            <div id="box-3-orderAmount" />
            <div className="label-3-orderAmount">$20 - $40</div>
            <div id="box-4-orderAmount" />
            <div className="label-4-orderAmount">$40 - $70</div>
            <div id="box-5-orderAmount" />
            <div className="label-5-orderAmount">$70 and more</div>
          </div>
        </div>
        <div id="orderCount-weekDay" className="card-def card-25">
          <h2>Orders Count / Week Day</h2>
          <br />
          <br />
          <div className="btn-group">
            <a href="#!" className="reset" onClick={this.handleResetClick}>
              Reset All
            </a>
          </div>
          <VictoryChart
            responsive={false}
            containerComponent={
              <VictoryBrushContainer
                brushDimension="x"
                brushDomain={{ x: [3, 5] }}
                defaultBrushArea={"all"}
                onBrushDomainChange={this.handleChange}
                handleStyle={{stroke: "transparent", strokeWidth:1, fill: "#000", fillOpacity: ".5"}}
                brushStyle={{
                  stroke: "transparent",
                  fill: "#999",
                  fillOpacity: 0.3
                }}
                name="orderWeekDayChart"
              />
            }
            domainPadding={10}
            height={340}
          >
            <VictoryBar
              data={this.props.orderWeekDayDim
                .group()
                .all()
                .map(day => {
                  return {
                    y: day.value,
                    x: [
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday"
                    ][day.key]
                  };
                })}
              style={{
                labels: { fill: "#888", fontSize: 15 },
                data: { fill: "#C64828" }
              }}
              animate={{
                duration: 1500,
                onLoad: { duration: 1200 }
              }}
            />
            <VictoryAxis
              style={{ tickLabels: { angle: -70, fontSize: 15, padding: 32 } }}
            />
            <VictoryAxis dependentAxis />
          </VictoryChart>
        </div>
        
      </div>
    );
  }
}

export default OrderCountCharts;
