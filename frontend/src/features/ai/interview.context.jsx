import { createContext, useState} from "react";

export const InterviewContext = createContext();

export const Interviewprovider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);
  const [allReports, setAllReports] = useState([]);

  return (
    <InterviewContext.Provider
      value={{
        loading,
        setLoading,
        report,
        setReport,
        allReports,
        setAllReports,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

