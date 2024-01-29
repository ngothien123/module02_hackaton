import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import * as yup from 'yup';
import './WorkList1.css';
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
const validationSchema = yup.object({
    job: yup.string().required("Tên công việc không được để trống"),
   });
   interface Job {
    id: string;
    job: string;
    isCompleted: boolean;
   }
   function App() {
    const [jobs, setJobs] = useState<Job[]>(() => {
      const storedJobs = localStorage.getItem("jobs");
      return storedJobs ? JSON.parse(storedJobs) : [];
    });
   
   
    useEffect(() => {
      localStorage.setItem("jobs", JSON.stringify(jobs));
    }, [jobs]);
   
   
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values, { resetForm }) => {
        try {
          const newJob = {
            id: uuidv4(), 
            isCompleted: false, 
            ...values,
          };
          const newJobs = [...jobs, newJob];
          localStorage.setItem("jobs", JSON.stringify(newJobs));
          resetForm();
          setJobs(newJobs);
          toast.success("Thêm công việc thành công!");
        } catch (error) {
          console.log(error, "sss");
        }
      },
    });
   
    const handleCheckboxChange = (jobId: string) => {
        const newJobs = jobs.map((item) => {
          if (item.id === jobId) {
            return {
              ...item,
              isCompleted: !item.isCompleted,
            };
          }
          return item;
        });
     
     
        setJobs(newJobs);
        localStorage.setItem("jobs", JSON.stringify(newJobs));
      };
     
     
      const completedJobsCount = useMemo(
        () => jobs.filter((job) => job.isCompleted).length,
        [jobs]
      );
     
     
      return (
        <>
          <ToastContainer />
          <form className="jobs-form-container" onSubmit={formik.handleSubmit}>
            <h1 className="jobs-heading">Danh sách công việc</h1>
     
     
            <div className="job-input-field">
              <input
                type="text"
                placeholder="Nhập tên công việc"
                onChange={formik.handleChange}
                value={formik.values.job}
                name="job"
                autoFocus
                ref={(input) => input && input.focus()}
              />
              <button className="add-btn" type="submit">
                Thêm
              </button>
            </div>
            {formik.errors.job && formik.submitCount > 0 && formik.touched.job && (
              <p className="job-error">{formik.errors.job}</p>
            )}
     
     
            <ul className="job-list">
              {jobs.map((job) => (
                <li key={job.id} className="job-item">
                  <div className="job-content">
                    <input
                      type="checkbox"
                      id={`isCompleted-${job.id}`}
                      name={`isCompleted-${job.id}`}
                      className="job-checkbox"
                      checked={job.isCompleted}
                      onChange={() => handleCheckboxChange(job.id)}
                    />
                    <label
                      htmlFor={`isCompleted-${job.id}`}
                      style={
                        job.isCompleted ? { textDecoration: "line-through" } : {}
                      }
                    >
                      {job.job}
                    </label>
                  </div>
                  <div className="job-actions">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        const newJobDescription = window.prompt(
                          "Nhập mô tả công việc mới",
                          job.job
                        );
                        if (newJobDescription !== null) {
                          const newJobs = jobs.map((item) => {
                            if (item.id === job.id) {
                              return {
                                ...item,
                                job: newJobDescription,
                              };
                            }
                            return item;
                          });
     
     
                          setJobs(newJobs);
                          localStorage.setItem("jobs", JSON.stringify(newJobs));
                          toast.success("Sửa công việc thành công!");
                        }
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        const shouldDelete = window.confirm(
                          "Bạn có chắc chắn muốn xóa công việc này không?"
                        );
                        if (shouldDelete) {
                          const newJobs = jobs.filter((item) => item.id !== job.id);
                          setJobs(newJobs);
                          localStorage.setItem("jobs", JSON.stringify(newJobs));
                          toast.success("Xóa công việc thành công!");
                        }
                      }}
               
          >
                      Xóa
                    </button>
                  </div>
                </li>
              ))}
            </ul>
     
     
            <div className="jobs-done-container">
              <p className="completed-jobs-text">
                {completedJobsCount === jobs.length
                  ? "Bạn đã hoàn thành tất cả công việc!"
                  : `  Công việc đã hoàn thành: ${completedJobsCount} / ${jobs.length} `}
              </p>
            </div>
          </form>
        </>
      );
     }
     
     
     export default App;
     

