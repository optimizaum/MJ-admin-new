import React, { useContext, useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  FaRegKeyboard,
  FaCalendarAlt,
  FaClock,
  FaFile,
  FaEnvelope,
  FaHashtag,
  FaDotCircle,
  FaList,
} from "react-icons/fa";
import { MyContext } from "../../MyContext/Mycontext";

const UpdateCustomForm = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { getSingleData, putPostData } = useContext(MyContext);
  const [userSingleData, setUserSingleData] = useState([]);
  const [formId, setFormId] = useState('')
  console.log("custom-form", userSingleData);
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();
  const [fields, setFields] = useState([]);
  const [formData1, setFormData1] = useState({
    formName: "",
    tagName: "",
    btnName: "",
  });
  useEffect(() => {
    async function fetchAllDetails() {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/source/${id}`);
        console.log("singleResponse-------------", response);

        setFormId(response?.data?.formData?._id)
        const formDetails = response?.data?.formData;
        setFields(formDetails.fields)


      } catch (error) {
        console.error('Error', error);
      }
    }
    fetchAllDetails();
  }, [])

  const inputTypes = [
    { name: "text", icon: <FaRegKeyboard /> },
    { name: "date", icon: <FaCalendarAlt /> },
    { name: "time", icon: <FaClock /> },
    { name: "file", icon: <FaFile /> },
    { name: "email", icon: <FaEnvelope /> },
    { name: "number", icon: <FaHashtag /> },
    { name: "radio", icon: <FaDotCircle /> },
    { name: "select", icon: <FaList /> },
  ];

  const handleInputChange = (e) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  };

  const addField = (type) => {
    setFields([
      ...fields,
      {
        type,
        label: "",
        id: Date.now(),
        options: [],
        required: false,
        placeholder: `Enter ${type.toLowerCase()}`,
        newOption: "",
      },
    ]);
  };

  const handleLabelChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].label = value;
    setFields(newFields);
  };

  const handleOptionChange = (index, optionValue) => {
    const newFields = [...fields];
    newFields[index].newOption = optionValue || "";
    setFields(newFields);
  };

  const addOption = (index) => {
    const newFields = [...fields];
    const optionValue = newFields[index].newOption.trim();
    if (optionValue) {
      newFields[index].options.push(optionValue);
      newFields[index].newOption = "";
    }
    setFields(newFields);
  };

  const toggleRequired = (index) => {
    const newFields = [...fields];
    newFields[index].required = !newFields[index].required;
    setFields(newFields);
  };

  const deleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleXClick = () => {
    navigate("/post");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await putPostData();
    const updatedForm = {
      fields: fields,

    };

    try {
      const response = await axios.put(`${API_BASE_URL}/form/${formId}`, updatedForm);
      console.log("Form updated successfully", response.data);
      toast.success("Form submitted successfully!");
      setTimeout(() => {
        navigate("/post");
      }, 3000);
    } catch (error) {
      toast.error("Error updating form", error);
    }
  };
  useEffect(() => {
    if (id) {
      getSingleData(id);
    }
  }, [id]);

  const { formData } = userSingleData;

  return (
    <div className="mt-2 flex justify-center items-center bg-white rounded-lg">
      <ToastContainer/>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4 mt-8 ml-4">Create Your Form</h2>
          <div
            onClick={handleXClick}
            className="bg-blue-500 mb-4 mt-8 mr-4 w-10 h-10 rounded cursor-pointer flex justify-center items-center text-white text-xl font-bold"
          >
            X
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row justify-between gap-6 mt-5">
            {/* Left Side - Input Fields */}
            <div className="w-full lg:w-2/3 p-4 max-h-[400px] overflow-y-auto scrollbar-thin">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col gap-3 border p-4 mt-2 rounded-lg shadow"
                >
                  {/* Label Input */}
                  <input
                    type="text"
                    placeholder="Enter label"
                    className="p-2 border outline-none focus:border-blue-400 rounded w-full"
                    value={field.label || ""}
                    onChange={(e) => handleLabelChange(index, e.target.value)}
                  />

                  {/* Dynamic Input Rendering */}
                  {field.type === "select" ? (
                    <div className="w-full">
                      <select className="p-2 border rounded w-full">
                        <option>Select Option</option>
                        {field?.options.map((option, i) => (
                          <option key={i}>{option.label}</option>
                        ))}
                      </select>
                      <div className="flex gap-2 mt-2">
                        <input
                          type="text"
                          placeholder="Add option"
                          className="p-2 border rounded w-full"
                          value={field.newOption || ""}
                          onChange={(e) =>
                            handleOptionChange(index, e.target.value)
                          }
                        />
                        <button
                          type="button"
                          className="px-3 py-2 bg-blue-400 text-white rounded hover:bg-blue-600"
                          onClick={() => addOption(index)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ) : field.type === "radio" ? (
                    <div className="w-full">
                      {field.options.map((option, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`radio-${field.id}`}
                            id={`radio-${field.id}-${i}`}
                          />
                          <label htmlFor={`radio-${field.id}-${i}`}>
                            {option.label || option}

                          </label>
                        </div>
                      ))}
                      <div className="flex gap-2 mt-2">
                        <input
                          type="text"
                          placeholder="Add radio option"
                          className="p-2 border rounded w-full"
                          value={field.newOption || ""}
                          onChange={(e) =>
                            handleOptionChange(index, e.target.value)
                          }
                        />
                        <button
                          type="button"
                          className="px-3 py-2 bg-blue-400 text-white rounded hover:bg-blue-400"
                          onClick={() => addOption(index)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ) : (
                    <input
                      type={field.type.toLowerCase()}
                      className="p-2 border rounded w-full"
                      required={field.required}
                    />
                  )}

                  {/* Render Button with Editable Properties */}
                  {field.type === "button" && (
                    <div className="flex flex-col items-start gap-2">
                      <button
                        style={{ backgroundColor: field.color }}
                        className="text-white font-semibold px-4 py-2 rounded"
                      >
                        {field.label}
                      </button>
                      <input
                        type="text"
                        placeholder="Button Name"
                        className="p-2 border rounded w-full"
                        value={field.label || ""}
                        onChange={(e) =>
                          handleLabelChange(index, e.target.value)
                        }
                      />
                    </div>
                  )}

                  {/* Required Checkbox & Delete Button */}
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={() => toggleRequired(index)}
                        className="cursor-pointer accent-blue-400 text-white"
                      />
                      <label className="text-sm font-medium ">Required</label>
                    </div>
                    <button
                      type="button"
                      className="text-blue-500"
                      onClick={() => deleteField(index)}
                    >
                      <MdDelete size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Add Input Fields */}
            <div className="w-full lg:w-1/3 p-4">
              <h2 className="text-lg font-semibold mb-4 text-center px-3 py-2 bg-yellow-500 text-white rounded w-full hover:bg-blue-600">
                Add Input Fields
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {inputTypes.map((type) => (
                  <button
                    key={type.name}
                    type="button"
                    className="flex items-center gap-2 px-3 py-2 bg-blue-400 text-white rounded text-md font-semibold hover:bg-blue-600"
                    onClick={() => addField(type.name)}
                  >
                    {type.icon} {type.name}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex justify-center w-full">
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-400 text-white text-lg font-semibold rounded w-full hover:bg-blue-600"
                >
                  Create Form
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCustomForm;