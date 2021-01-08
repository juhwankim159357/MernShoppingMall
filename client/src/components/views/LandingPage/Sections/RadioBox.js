import React, { useState } from "react";
import { Collapse, Radio } from "antd";
const { Panel } = Collapse;

function RadioBox(props) {

    const [Value, setValue] = useState(0)

    const renderRadioBoxList = () =>(
    props.list &&
    props.list.map((value) => (
    
      <Radio key={value._id} value={value._id}>
          {value.name}
      </Radio>
    )));
    const handleRadio = (e)=> {
        setValue(e.target.value)
        props.handleFilter(e.target.value)
    }

    return (
        <div>
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="Price" key="1">
              <Radio.Group onChange={handleRadio} value={Value}>
            {renderRadioBoxList()}
            </Radio.Group>
          </Panel>
        </Collapse>
      </div>
    )
}

export default RadioBox
