import { useState, useEffect } from 'react'
import axios from 'axios'

import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom'
import CourseNavigation from './CourseNavigation'
import Modules from './Modules'
import Home from './Home'
import Assignments from './Assignment'
import AssignmentEditor from './Assignment/AssignmentEditor'
import Grades from './Grades'

function Courses() {
  const URL = 'http://localhost:4000/api/courses'

  const { courseId, '*': link } = useParams()
  const [course, setCourse] = useState({})

  const findCourseById = async (courseId) => {
    const response = await axios.get(`${URL}/${courseId}`)
    setCourse(response.data)
  }
  useEffect(() => {
    findCourseById(courseId)
  }, [courseId])

  // const course = courses.find((course) => course._id === courseId)
  return (
    <div>
      <div className="align-items-center flex-row flex-fill d-none d-lg-flex justify-content-center">
        <i className="fa-solid fa-bars fa-lg icon_red" style={{ marginLeft: '9px' }}></i>

        <span className="flex-grow-1 me-5 flex-nowrap">
          <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb" className="mb-0 ps-3">
            <ol className="breadcrumb m-0 flex-nowrap" id="breadcrumb-home-title">
              <li className="breadcrumb-item red-link no-wrap-btn">
                <Link to="/Kanbas/Courses" style={{ textDecoration: 'None' }} className="icon_red flex-nowrap d-flex">
                  {course?.name}
                </Link>
              </li>
              <li className="breadcrumb-item active flex-nowrap no-wrap-btn" aria-current="page">
                {link.split('/')[0]}
              </li>
            </ol>
          </nav>
        </span>
        <button type="button" className="btn btn-secondary float-end btn-sm flex-nowrap no-wrap-btn">
          <i className="fa-solid fa-glasses"></i>
          Student View
        </button>
      </div>
      <hr className="d-none d-lg-block" />
      <div className="d-flex flex-row flex-fill">
        <CourseNavigation />
        <Routes>
          <Route path="/" element={<Navigate to="Home" />} />
          <Route path="Home" element={<Home />} />
          <Route path="Modules" element={<Modules />} />
          <Route path="Assignments" element={<Assignments />} />
          <Route path="Assignments/Editor" element={<AssignmentEditor />} />
          <Route path="Assignments/Editor/:assignmentId" element={<AssignmentEditor />} />
          <Route path="Grades" element={<Grades />} />
        </Routes>
      </div>
      {/* </div>
      </div> */}
    </div>
  )
}
export default Courses
