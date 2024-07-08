import React from "react";
import SelectDate from "./SelectItem";
import { day_ar, month_ar, year_ar } from "../../../func/fanc";

const SelectList = ({ type, setBirthday, birthday, render_ar }) => {
  return (
    <div className=" flex items-center justify-center w-full gap-1">
      <SelectDate
        type={"month"}
        setBirthday={setBirthday}
        birthday={birthday}
        render_ar={month_ar}
      />
      <SelectDate
        type={"day"}
        setBirthday={setBirthday}
        birthday={birthday}
        render_ar={day_ar}
      />
      <SelectDate
        type={"year"}
        setBirthday={setBirthday}
        birthday={birthday}
        render_ar={year_ar}
      />
    </div>
  );
};

export default SelectList;
