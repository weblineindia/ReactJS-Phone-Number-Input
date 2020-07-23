import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";
import * as Regex from "./regex";
class PhoneNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      isInvalidPhone: false,
      isDuplicatePhone: false,
      phoneCodeValue: this.props.defaultSelectedCountry,
    };
  }
  /**
   * This method is used for handle input change
   * @param {*} event
   */
  handleInput(event) {
    let regex = this.props.regex;
    if (event.target.value === "" || regex.test(event.target.value)) {
      this.props.onChange(event, this.props.index);
    }
    this.setState({
      isInvalidPhone: false,
    });
  }
  /**
   * This method is used for handle input focus
   * @param {*} event
   */
  handleFocus(event) {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }
  /**
   * This method is used for handle input blur
   * @param {*} event
   */
  handleBlur(event) {
    if (this.props.onBlur()) {
      this.props.onBlur(event);
    }
    event.preventDefault();
    event.stopPropagation();
    this.checkDupllicatePhone();
  }
  /**
   * This mehod is used for handle duplicate emails
   * @param {*} event
   */
  checkDupllicatePhone() {
    const tempArray = [];
    if (this.props.value.length > 1) {
      for (let i = 0; i <= this.props.value.length - 1; i++) {
        if (i !== this.props.index && this.props.value[i].phone !== '' && this.props.value[this.props.index].phone !== '') {
          if (
            this.props.value[i].phone ===
            this.props.value[this.props.index].phone
          ) {
            if (
              this.props.defaultSelectedCountry[i].code ===
              this.state.phoneCodeValue[this.props.index].code
            ) {
              tempArray.push(this.props.value[i]);
            }
          }
        }
      }
    }
    if (tempArray.length > 0) {
      this.setState({
        isDuplicatePhone: true,
      });
    } else {
      this.setState({
        isDuplicatePhone: false,
      });
    }
  }
  /**
   * This method is used for handle input key down
   * @param {*} event
   */
  handleKeyDown(event) {
    if (this.props.onKeyDown()) {
      this.props.onKeyDown(event);
    }
  }
  /**
   * This method is used for handle input key up
   * @param {*} event
   */
  handleKeyUp(event) {
    if (this.props.onKeyUp()) {
      this.props.onKeyUp(event);
    }
  }
  /**
   * This method is used for handle input key press
   * @param {*} event
   */
  handleKeyPress(event) {
    if (this.props.onKeyPress()) {
      this.props.onKeyPress(event);
    }
  }
  /**
   * This method is used for handle multiple email
   */
  onMultipleAdd() {
    this.props.onMultiplePhone();
  }
  /**
   * This method is used for handle phone code dropdown change
   */
  onChageDropdownValue(event) {
    let value = this.props.preferredCountries.filter(
      (x) => x.code === event.target.value
    );
    let vData = this.props.defaultSelectedCountry;
    vData[this.props.index] = value[0];
    this.setState({
      phoneCodeValue: vData,
    });
    this.props.onChageDropdown(vData, this.props.index);
    this.checkDupllicatePhone();
  }
  render() {
    return (
      <div>
        <div className="list-view">
        <div className="country-list">
          {!this.props.ignoredCountries ? (
            <select
              className="form-control option-block"
              value={this.state.phoneCodeValue[this.props.index].code}
              name={this.props.name + this.props.index}
              onChange={this.onChageDropdownValue.bind(this)}
            >
              {this.props.preferredCountries.map((e, key) => {
                return (
                  <option key={key} value={e.code}>
                    {e.code}
                  </option>
                );
              })}
            </select>
          ) : (
            ""
          )}
        </div>
        <div class="phone-input">
        <input
          id={this.props.id}
          name={this.props.name}
          value={this.props.value[this.props.index].phone}
          tabIndex={this.props.tabIndex}
          placeholder={this.props.placeholder}
          hide={this.props.hide}
          disabled={this.props.disabled}
          type={this.state.passwordFieldType}
          maxLength={
            this.props.preferredCountries.length > 0
              ? this.state.phoneCodeValue[this.props.index].maxLength ||
                this.state.phoneCodeValue[this.props.index].maxLength === ""
                ? this.state.phoneCodeValue[this.props.index].maxLength
                : this.state.phoneCodeValue[this.props.index].maxLength
              : this.props.maxLength
          }
          autoComplete={this.props.autoComplete}
          className='form-control'
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onChange={this.handleInput.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          onKeyUp={this.handleKeyUp.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        ></input>
        <React.Fragment>
          <React.Fragment>
            <span className="add-minus">
              <i className="fa fa-minus" aria-hidden="true"></i>
            </span>
          </React.Fragment>
          {this.props.isShowPlus ? (
             <span>
            <i
              className="fa fa-plus"
              aria-hidden="true"
              onClick={this.onMultipleAdd.bind(this)}
            ></i>
            </span>
          ) : (
            ""
          )}
        </React.Fragment>

        {this.state.isInvalidPhone ? (
          <div className="error-msg">{this.props.phoneFormateError}</div>
        ) : (
          ""
        )}
        {this.state.isDuplicatePhone ? (
          <div className="error-msg">{this.props.duplicatePhoneError}</div>
        ) : (
          ""
        )}
      </div>
      </div>
      </div>
    );
  }
}
PhoneNumber.propTypes = {
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  onChageDropdown: PropTypes.func,
  onMultiplePhone: PropTypes.func,
  value: PropTypes.array,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  tabIndex: PropTypes.number,
  hide: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  regex: PropTypes.any,
  phoneFormateError: PropTypes.string,
  duplicatePhoneError: PropTypes.string,
  isMultiple: PropTypes.bool,
  isShowPlus: PropTypes.bool,
  index: PropTypes.number,
  defaultSelectedCountry: PropTypes.array,
  ignoredCountries: PropTypes.bool,
  preferredCountries: PropTypes.array,
};
PhoneNumber.defaultProps = {
  onFocus: function () {},
  onBlur: function () {},
  onKeyDown: function () {},
  onKeyPress: function () {},
  onKeyUp: function () {},
  onChange: function () {},
  onMultiplePhone: function () {},
  onChageDropdown: function () {},
  placeholder: "Phone Number",
  id: "",
  name: "",
  tabIndex: 0,
  hide: false,
  disabled: false,
  type: "text",
  maxLength: 10,
  autoComplete: "",
  className: "form-control",
  value: [{ phone: "" }],
  regex: Regex.ONLY_NUMBERS_REGEX,
  phoneFormateError: "Phone is not valid",
  duplicatePhoneError: "Do not enter same phone number",
  isShowPlus: true,
  isMultiple: true,
  index: 0,
  defaultSelectedCountry: [],
  ignoredCountries: false,
  preferredCountries: [],
};
export default PhoneNumber;
