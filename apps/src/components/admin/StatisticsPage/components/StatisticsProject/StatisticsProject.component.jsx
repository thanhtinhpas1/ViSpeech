/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import ReportUtils from 'utils/report.util'
import StatisticsTemplate from '../StatisticsTemplate/StatisticsTemplate.component'

const StatisticsProject = ({
  currentUser,
  chartOptions,
  getMyProjectListObj,
  getStatisticsByprojectIdObj,
  getMyProjects,
  getStatisticsById,
}) => {
  const [projectList, setProjectList] = useState([])
  const placeHolderSelectId = {
    found: 'Chọn dự án',
    notFound: 'Không tìm thấy dự án',
  }

  useEffect(() => {
    if (currentUser._id) {
      getMyProjects({ userId: currentUser._id })
    }
  }, [currentUser._id, getMyProjects])

  useEffect(() => {
    if (getMyProjectListObj.myProjectList.length > 0) {
      const projects = getMyProjectListObj.myProjectList.map(project => {
        return {
          ...project,
          display: project.name,
        }
      })
      setProjectList(projects)
    }
  }, [getMyProjectListObj])

  return (
    <div>
      {currentUser._id && (
        <StatisticsTemplate
          chartOptions={chartOptions}
          statisticsType={ReportUtils.STATISTICS_TYPE.PROJECT}
          data={projectList}
          placeHolderSelectId={placeHolderSelectId}
          getStatisticsByIdObj={getStatisticsByprojectIdObj}
          getStatisticsById={getStatisticsById}
        />
      )}
    </div>
  )
}

export default StatisticsProject
