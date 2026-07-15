import { Link } from "react-router-dom";
import "./style.css";
import Profile from "./Profile";
import Interests from "./Interests";
import Settings from "./Settings";
import { useState } from "react";
interface TabProps {
  name: string;
  age: number;
  email: string;
  interests: string[];
  theme: string;
  handleChange: (event: any, value: any) => void;
  errors: any;
}
interface Tab {
  name: string;
  component: React.FC<TabProps>;
  validation: Function;
}
function MultiStepForm() {
  const tabs: Tab[] = [
    {
      name: "Profile",
      component: Profile,
      validation: () => {
        const err = {} as any;
        if (data.name.length === 0) {
          err.name = "Name is not valid";
        }
        if (data.age < 18 || !data.age) {
          err.age = "Age is not valid";
        }
        if (!data.email.length || data.email.length < 5) {
          err.email = "Email is not valid";
        }
        setErrors(err);
        return Object.keys(err).length > 0;
      },
    },
    {
      name: "Interests",
      component: Interests,
      validation: () => {
        const err = {} as any;
        if (data.interests.length < 1) {
          err.interests = "Select atleast 1 interest";
        }
        setErrors(err);
        return Object.keys(err).length > 0;
      },
    },
    {
      name: "Settings",
      component: Settings,
      validation: () => {
        return false;
      },
    },
  ];
  const [data, setData] = useState({
    name: "Jaideep",
    age: 33,
    email: "johny.s.chauhan@gmail.com",
    interests: ["music", "coding"],
    theme: "dark",
  });

  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState<any>({});
  const ActiveTabComponent = tabs[activeTab].component;

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    console.log("name", name, "value", value);
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handlePrevClick = () => {
    setActiveTab((prev) => prev - 1);
  };

  const handleNextClick = () => {
    if (tabs[activeTab].validation()) {
      return;
    } else {
      setActiveTab((next) => next + 1);
    }
  };

  const handleSubmitClick = (e: any) => {
    e.preventDefault();
    console.log(JSON.stringify(data));
  };

  return (
    <div>
      <div className="p-8 flex justify-center items-center flex-col">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
        <h2 className="text-2xl font-bold mt-4">MultiStep Tab Form</h2>
      </div>
      <div className="tab-container">
        {tabs.map((tab, index) => {
          return (
            <div
              data-active={activeTab === index ? "true" : "false"}
              key={index}
              onClick={() => !tabs[activeTab].validation() && setActiveTab(index)}
              className="heading"
            >
              {tab.name}
            </div>
          );
        })}
      </div>
      <div className="tab-body">
        <ActiveTabComponent
          {...data}
          handleChange={handleChange}
          errors={errors}
        />
      </div>
      <div className="form-btns">
        {activeTab > 0 && (
          <button type="button" onClick={handlePrevClick}>
            Prev
          </button>
        )}
        {activeTab < tabs.length - 1 && (
          <button type="button" onClick={handleNextClick}>
            Next
          </button>
        )}
        {activeTab === tabs.length - 1 && (
          <button type="submit" onClick={handleSubmitClick}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default MultiStepForm;
