import React, { useState, useEffect } from "react";
import ShowPricings from "../../components/utils/ShowPricings";
import TotalEstimatedprice from "../../components/utils/TotalEstimatedprice";
const ShowToolsOptions = (props) => {
  //   console.log(props);
  const [checkedPrice, setCheckedPrice] = useState([]);
  const [checkedTool, setCheckedTool] = useState([]);
  const [total, setTotal] = useState([]);
  const [subtotal, setSubTotal] = useState([]);

  const handlePriceToggle = (tool) => {
    const clickedId = checkedTool.indexOf(tool._id);
    const allTools = [...checkedTool];
    let total = 0;
    if (clickedId === -1) {
      allTools.push(tool._id);
      checkedPrice.push(tool.clientPrice);
      const choosenPrice = [...checkedPrice];
      for (let i = 0; i < choosenPrice.length; i++) {
        if (choosenPrice[i]) {
          total = choosenPrice[i] + total;
        }
      }
    } else {
      allTools.splice(clickedId, 1);
      const reducedPrice = [...checkedPrice];
      reducedPrice.splice(clickedId, 1);
      setCheckedPrice(reducedPrice);
      let subtotal = reducedPrice.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
      }, 0);
      setSubTotal(subtotal);
    }
    setCheckedTool(allTools);
    setTotal(total);
  };

  const showToolsoptions = (tools) => {
    return tools.map((tool, i) => (
      <li key={i} className="list-unstyled">
        <input
          onChange={() => handlePriceToggle(tool)}
          type="checkbox"
          name="checkbox"
          className="mr-2"
        />

        <label className="form-check-label">
          <h5>
            {tool.tool} : {tool.clientPrice} $
          </h5>
        </label>
      </li>
    ));
  };

  const checkedtoolinfo = {
    total: total,
    subtotal: subtotal,
  };
  // console.log(checkedtoolinfo);
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4  pb-5">{showToolsoptions(props.tools)}</div>
          <ShowPricings total={total} subtotal={subtotal} />
          <div className="container-fluid custome-class">
            <TotalEstimatedprice
              basePrice={props.basePrice}
              checkedtoolinfo={checkedtoolinfo}
              alltools={props.tools}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ShowToolsOptions;

//https://dev.to/pnkfluffy/passing-data-from-child-to-parent-with-react-hooks-1ji3
//https://pradeeploganathan.com/git/git-branching-strategies/
//https://www.agileana.com/blog/git-best-practices-for-agile-projects-and-distributed-teams/
//https://www.creativebloq.com/web-design/choose-right-git-branching-strategy-121518344
