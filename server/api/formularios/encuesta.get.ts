export default defineCachedEventHandler(() => surveyResults(), { maxAge: 60, name: 'survey-results' })
