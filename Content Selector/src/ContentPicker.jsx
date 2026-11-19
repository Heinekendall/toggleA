import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonVariant,
  Checkbox,
  Dropdown,
  DropdownAlignment,
  DropdownButton,
  DropdownContent,
  DropdownDropDirection,
  DropdownMenuItem,
  Modal,
  ModalSize,
  ThemeContext,
  magma,
} from 'react-magma-dom';
import {
  PreviewIcon,
  VisibilityOffIcon,
  SettingsIcon,
  EditIcon,
  FileCopyIcon,
  ImportExportIcon,
  ListAltIcon,
  ChevronRightIcon,
  FolderIcon,
  DeleteIcon,
  AssessmentIcon,
  BookIcon,
  UnfoldMoreIcon,
  VisibilityIcon,
  ListIcon,
  FilterListIcon,
  SearchIcon,
  CalendarTodayIcon,
  LinkIcon,
  MoreVertIcon,
  PrintIcon,
  AssignmentIcon,
  PersonIcon,
  LockIcon,
  ScheduleIcon,
  AccessTimeIcon,
} from 'react-magma-icons';
import './picker.css';

const activities = [
  { id: 'activity-1', title: 'Activity #1', due: 'Oct 29, 2024 @ 11:59 PM EDT', type: 'PRACTICE', points: '3' },
  { id: 'activity-2', title: 'Activity #2', due: 'Oct 29, 2024 @ 11:59 PM EDT', type: 'PRACTICE', points: '3' },
  { id: 'activity-3', title: 'Activity #3', due: 'Oct 29, 2024 @ 11:59 PM EDT', type: 'COUNTS TOWARDS GRADE', points: '3', unlock: 'Feb 5 @ 12:00 AM EST', description: 'Candy lollipop lemon drops toffee cake. Tootsie roll chocolate bar chocolate oat cake sugar plum bear claw. Cheesecake danish p...' },
];

const chapter1Sections = [
  { id: 'chapter1-learn', key: 'chapter1Learn', label: 'Learn It', reading: { id: 'c1-learn-reading', title: 'Reading' }, activities: [
    { id: 'c1-learn-1', title: 'Activity #1: Scarcity and Choice', due: 'Oct 29, 2024 @ 11:59 PM EDT', type: 'PRACTICE', points: '3' },
    { id: 'c1-learn-2', title: 'Activity #2: Opportunity Cost', due: 'Oct 30, 2024 @ 11:59 PM EDT', type: 'PRACTICE', points: '3' },
  ] },
  { id: 'chapter1-study', key: 'chapter1Study', label: 'Study It', activities: [
    { id: 'c1-study-1', title: 'Activity #1: Key Economic Terms', due: 'Nov 1, 2024 @ 11:59 PM EDT', type: 'PRACTICE', points: '3' },
    { id: 'c1-study-2', title: 'Activity #2: Production Possibilities', due: 'Nov 2, 2024 @ 11:59 PM EDT', type: 'PRACTICE', points: '3' },
    { id: 'c1-study-3', title: 'Chapter 1 Practice Quiz', due: 'Nov 3, 2024 @ 11:59 PM EDT', type: 'COUNTS TOWARDS GRADE', points: '5' },
  ], resources: [
    { id: 'c1-study-flashcards-1', title: 'Flashcards #1', icon: 'flashcards' },
    { id: 'c1-study-flashcards-2', title: 'Flashcards #2', icon: 'flashcards' },
    { id: 'c1-study-powerpoint', title: 'PowerPoint', icon: 'powerpoint' },
  ] },
  { id: 'chapter1-apply', key: 'chapter1Apply', label: 'Apply It', activities: [
    { id: 'c1-apply-1', title: 'Activity #1: Analyze a Trade-Off', due: 'Nov 4, 2024 @ 11:59 PM EDT', type: 'PRACTICE', points: '3' },
    { id: 'c1-apply-2', title: 'Activity #2: A Personal Budget', due: 'Nov 5, 2024 @ 11:59 PM EDT', type: 'PRACTICE', points: '3' },
    { id: 'c1-apply-3', title: 'Chapter 1 Case Study: Economic Decisions', due: 'Nov 6, 2024 @ 11:59 PM EDT', type: 'COUNTS TOWARDS GRADE', points: '8' },
  ] },
];

function SelectBox({ id, label, checked, onChange, isTextVisuallyHidden = true }) {
  return <Checkbox ariaLabel={label} labelText={label} isTextVisuallyHidden={isTextVisuallyHidden} checked={checked} onChange={onChange} containerStyle={{ margin: 0, padding: 0 }} />;
}

function PickerButton({ children, icon, active = false, onClick }) {
  return <Button size={ButtonSize.small} color={ButtonColor.secondary} variant={ButtonVariant.solid} className={`picker-button${active ? ' is-active' : ''}`} onClick={onClick}><span className="picker-button-content">{icon && <span className="picker-button-icon" aria-hidden="true">{icon}</span>}<span>{children}</span></span></Button>;
}

function ActivityMenu({ title, onPreview, onManageSettings, onEditContent }) {
  const onAction = () => {};
  return (
    <Dropdown width={264} alignment={DropdownAlignment.end} dropDirection={DropdownDropDirection.down} maxHeight={320}>
      <DropdownButton className="activity-more" aria-label={`${title} options`} variant="link" size={ButtonSize.small} icon={<MoreVertIcon size={16} />} />
      <DropdownContent className="activity-menu">
        <DropdownMenuItem icon={<PreviewIcon size={18} />} onClick={onPreview}>Preview activity</DropdownMenuItem>
        <DropdownMenuItem icon={<VisibilityOffIcon size={18} />} onClick={onAction}>Hide activity from students</DropdownMenuItem>
        <DropdownMenuItem icon={<SettingsIcon size={18} />} onClick={onManageSettings}>Manage activity settings</DropdownMenuItem>
        <DropdownMenuItem icon={<EditIcon size={18} />} onClick={onEditContent}>Edit activity details and content</DropdownMenuItem>
        <DropdownMenuItem icon={<FileCopyIcon size={18} />} onClick={onAction}>Duplicate activity</DropdownMenuItem>
        <DropdownMenuItem icon={<ImportExportIcon size={18} />} onClick={onAction}>Move activity</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
  );
}

function FolderMenu({ title }) {
  const onAction = () => {};
  return (
    <Dropdown width={264} alignment={DropdownAlignment.end} dropDirection={DropdownDropDirection.down} maxHeight={320}>
      <DropdownButton className="activity-more" aria-label={`${title} options`} variant="link" size={ButtonSize.small} icon={<MoreVertIcon size={18} />} />
      <DropdownContent className="activity-menu folder-menu">
        <DropdownMenuItem icon={<ListAltIcon size={18} />} onClick={onAction}>Add Activity from Activity Bank</DropdownMenuItem>
        <DropdownMenuItem icon={<EditIcon size={18} />} onClick={onAction}>Edit folder details</DropdownMenuItem>
        <DropdownMenuItem icon={<ListAltIcon size={18} />} onClick={onAction}>Add activity to folder <ChevronRightIcon size={16} /></DropdownMenuItem>
        <DropdownMenuItem icon={<FolderIcon size={18} />} onClick={onAction}>Add folder to folder</DropdownMenuItem>
        <DropdownMenuItem icon={<DeleteIcon size={18} />} onClick={onAction}>Remove folder</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
  );
}

function ActivityRow({ item, selected, onSelect, onPreview, onManageSettings, onEditContent }) {
  return (
    <div className="activity-item">
      <div className="picker-row activity-row">
        <div className="row-check"><SelectBox label={`Select ${item.title}`} checked={selected} onChange={onSelect} /></div>
        <div className="row-icon" aria-hidden="true"><LinkIcon size={20} /></div>
        <div className="row-copy activity-preview-trigger" role="button" tabIndex={0} aria-label={`Preview ${item.title}`} onClick={onPreview} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onPreview(); } }}>
          <div className="activity-title">{item.title}</div>
          <small>Due <a>{item.due}</a></small>
          <small className={item.type === 'COUNTS TOWARDS GRADE' ? 'grade-type' : ''}>{item.type}</small>
        </div>
        {item.unlock && <div className="unlock-stat">♙ Unlocks <a>{item.unlock}</a></div>}
        {item.unlock && <div className="picker-stat"><b>•••</b><small>password<br />required</small></div>}
        <div className="picker-stat"><b>0%</b><small>submitted</small></div>
        <div className="picker-stat"><b>--</b><small>avg score</small></div>
        <div className="picker-stat"><b>{item.points}</b><small>points</small></div>
        <ActivityMenu title={item.title} onPreview={onPreview} onManageSettings={onManageSettings} onEditContent={onEditContent} />
      </div>
      {item.description && <div className="activity-description"><span>{item.description}</span><button className="row-expand" type="button" aria-label="Expand activity description">⌄</button></div>}
    </div>
  );
}

const accommodationStudents = [
  { id: 's1', name: 'Alderman, Haiden' }, { id: 's2', name: 'Burn, Aaron' },
  { id: 's3', name: 'Alderman, Haiden' }, { id: 's4', name: 'Alderman, Haiden' },
  { id: 's5', name: 'Baker, Olivia' }, { id: 's6', name: 'Campbell, Noah' },
  { id: 's7', name: 'Chen, Maya' }, { id: 's8', name: 'Davis, Ethan' },
  { id: 's9', name: 'Garcia, Sofia' }, { id: 's10', name: 'Hughes, Liam' },
];

function StudentAccommodation() {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [groupFilter, setGroupFilter] = useState('selected');
  const toggleStudent = id => setSelectedStudents(current => current.includes(id)
    ? current.filter(student => student !== id)
    : [...current, id]);
  const allSelected = selectedStudents.length === accommodationStudents.length;

  return <div className="accommodation-layout" role="tabpanel" aria-label="Student Accommodation">
    <section className="accommodation-students" aria-label="Student list">
      <div className="accommodation-filter-row">
        <label htmlFor="group-filter">Filter by Group</label>
        <select id="group-filter" value={groupFilter} onChange={event => setGroupFilter(event.target.value)}>
          <option value="selected">Selected ({selectedStudents.length})</option>
          <option value="all">All students</option>
        </select>
        <span>1-10 of 25</span>
      </div>
      <div className="accommodation-table-wrap">
        <table className="accommodation-table">
          <thead><tr>
            <th className="accommodation-check"><Checkbox ariaLabel="Select all students" isTextVisuallyHidden checked={allSelected} onChange={() => setSelectedStudents(allSelected ? [] : accommodationStudents)} containerStyle={{ margin: 0, padding: 0 }} /></th>
            <th>Name</th><th>Release<br />Early</th><th>Extend<br />Due</th><th>Attempts<br />pts</th><th>Extend<br />Time</th>
          </tr></thead>
          <tbody>{accommodationStudents.map(student => <tr key={student.id}>
            <td className="accommodation-check"><Checkbox ariaLabel={`Select ${student.name}`} isTextVisuallyHidden checked={selectedStudents.includes(student.id)} onChange={() => toggleStudent(student.id)} containerStyle={{ margin: 0, padding: 0 }} /></td>
            <td>{student.name}</td><td></td><td></td><td></td><td></td>
          </tr>)}</tbody>
        </table>
      </div>
      <nav className="accommodation-pagination" aria-label="Student pages">
        <button type="button" aria-label="Previous page" disabled>‹</button><button type="button" className="current" aria-current="page">1</button><button type="button">2</button><button type="button">3</button><span>…</span><button type="button">Next ›</button>
      </nav>
    </section>
    <section className="accommodation-details" aria-label="Accommodation details">
      <AccommodationDate title="Date Available" detail="Assignment Available: 12/2/2024 at 12:00 AM EST" firstLabel="Days to release early" secondLabel="Hours to release early" firstHelp="Calendar days" firstValue="Number" secondValue="Number" />
      <AccommodationDate title="Date Due" detail="Assignment Due: 12/5/2024 at 3:30 PM EST" firstLabel="Days to extend due" secondLabel="Hours to extend due" firstValue="Number" secondValue="Number" checkbox="Remove Accommodation" />
      <div className="accommodation-section">
        <div className="accommodation-section-title">Attempts<span>Assignment Attempts: 1</span></div>
        <label className="accommodation-control"><span>Number of attempts accommodation</span><select defaultValue=""><option value="">Select option</option><option>2 attempts</option><option>3 attempts</option></select></label>
        <AccommodationRemoval label="Remove Accommodation" />
      </div>
      <div className="accommodation-section accommodation-last">
        <div className="accommodation-section-title">Time Limit<span>Assignment Time Limit: 1 hour</span></div>
        <label className="accommodation-control"><span>Time limit accommodation</span><select defaultValue=""><option value="">Select option</option><option>2 hours</option><option>3 hours</option></select></label>
        <AccommodationRemoval label="Remove Accommodation" />
        <Button size={ButtonSize.medium} color={ButtonColor.secondary} disabled>＋ Set and add more accommodations</Button>
      </div>
    </section>
  </div>;
}

function AccommodationDate({ title, detail, firstLabel, secondLabel, firstHelp, firstValue, secondValue, checkbox }) {
  return <div className="accommodation-section">
    <div className="accommodation-section-title">{title}<span>{detail}</span></div>
    <div className="accommodation-number-row">
      <label className="accommodation-control"><span>{firstLabel}</span><input type="number" placeholder={firstValue} />{firstHelp && <small>{firstHelp}</small>}</label>
      <label className="accommodation-control"><span>{secondLabel}</span><input type="number" placeholder={secondValue} /></label>
    </div>
    {checkbox && <AccommodationRemoval label={checkbox} />}
  </div>;
}

function AccommodationRemoval({ label }) {
  const [checked, setChecked] = useState(false);
  return <Checkbox ariaLabel={label} labelText={label} checked={checked} onChange={event => setChecked(event.target.checked)} containerStyle={{ margin: 0 }} />;
}

function BulkDatesModal({ isOpen, activityCount, onClose, onBack }) {
  const [dateMode, setDateMode] = useState('select');
  const [availableDate, setAvailableDate] = useState('');
  const [availableTime, setAvailableTime] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');

  const modes = [
    { id: 'select', label: 'Select Dates' },
    { id: 'shift', label: 'Shift Dates' },
    { id: 'remove', label: 'Remove Dates' },
  ];

  return <Modal
    isOpen={isOpen}
    onClose={onClose}
    ariaLabel="Edit dates for selected activities"
    size={ModalSize.large}
    className="bulk-dates-modal"
    containerStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 0 }}
    style={{ boxSizing: 'border-box', width: 'min(767px, calc(100vw - 24px))', maxWidth: '767px', height: 'min(590px, calc(100vh - 24px))', display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0, margin: 0 }}
  >
    <div className="bulk-dates-dialog" id="bulk-dates-modal" role="dialog" aria-modal="true" aria-label="Edit dates for selected activities">
      <div className="bulk-dates-heading"><Button color={ButtonColor.secondary} size={ButtonSize.small} onClick={onBack}><span className="preview-back-arrow" aria-hidden="true">←</span> Back</Button></div>
      <h2 className="bulk-dates-title">Edit Dates for {activityCount} {activityCount === 1 ? 'Activity' : 'Activities'}</h2>
      <div className="bulk-dates-panel">
        <div className="bulk-date-type"><span>Date Type</span><fieldset className="bulk-date-modes" aria-label="Date editing mode">
          {modes.map(mode => <label key={mode.id}>
            <input type="radio" name="bulk-date-mode" value={mode.id} checked={dateMode === mode.id} onChange={() => setDateMode(mode.id)} />
            <span>{mode.id === 'select' ? 'Selected Dates' : mode.label}</span>
          </label>)}
        </fieldset></div>
        {dateMode !== 'remove' && <>
          <p className="bulk-date-notice">Extending the due date <strong>automatically removes late penalty deductions from existing submissions.</strong> This might take a few minutes to reflect in the gradebook.</p>
          <div className="bulk-date-fields">
            <label className="bulk-date-field"><span>{dateMode === 'shift' ? 'Shift Date Available' : 'Date Available'}</span><input type="date" value={availableDate} onChange={event => setAvailableDate(event.target.value)} /></label>
            <span className="bulk-date-at" aria-hidden="true">at</span>
            <label className="bulk-date-field"><span>Time Available (MST)</span><input type="time" value={availableTime} onChange={event => setAvailableTime(event.target.value)} /></label>
            <label className="bulk-date-field"><span>{dateMode === 'shift' ? 'Shift Date Due' : 'Date Due'}</span><input type="date" value={dueDate} onChange={event => setDueDate(event.target.value)} /></label>
            <span className="bulk-date-at" aria-hidden="true">at</span>
            <label className="bulk-date-field"><span>Time Due (MST)</span><input type="time" value={dueTime} onChange={event => setDueTime(event.target.value)} /></label>
          </div>
        </>}
      </div>
      <div className="bulk-dates-actions"><Button color={ButtonColor.secondary} size={ButtonSize.medium} onClick={onClose}>Cancel</Button><Button color={ButtonColor.primary} size={ButtonSize.medium} onClick={onClose}>Save</Button></div>
    </div>
  </Modal>;
}

function ActivitySettings({ activity, onBack }) {
  const [activeTab, setActiveTab] = useState('details');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [settingsTemplate, setSettingsTemplate] = useState('Quiz');
  const tabs = [
    { id: 'details', label: 'Assignment Details', icon: <AssignmentIcon size={20} /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon size={20} /> },
    { id: 'accommodations', label: 'Student Accommodation', icon: <PersonIcon size={20} /> },
  ];
  return (
    <div className="activity-settings">
      <div className="settings-heading">
        <Button color={ButtonColor.secondary} size={ButtonSize.small} onClick={onBack}><span className="preview-back-arrow" aria-hidden="true">←</span> Back</Button>
        <h2>Activity Settings: {activity.title === 'Activity #1' ? 'Chapter 1 Pre-Test' : activity.title}</h2>
      </div>
      <div className="settings-panel">
        <div className="settings-tabs" role="tablist" aria-label="Activity settings">
          {tabs.map(tab => <button key={tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => setActiveTab(tab.id)}>{tab.icon}{tab.label}</button>)}
        </div>
        {activeTab === 'details' ? <div className="settings-form">
          <label className="settings-field full"><span>Title *</span><input disabled placeholder="Activity Title" /></label>
          <label className="settings-field full"><span>Description</span><textarea defaultValue="Text" /></label>
          <div className="settings-field"><span>Date Available</span><Button size={ButtonSize.small} color={ButtonColor.secondary}>Add Date Available</Button></div>
          <div className="settings-field"><span>Date Due</span><Button size={ButtonSize.small} color={ButtonColor.secondary}>Add Date Due</Button></div>
          <label className="settings-field"><span>Total Points Possible</span><input defaultValue="#####" /><small>If points are modified here, individual question points will scale according to their current point ratios.</small></label>
          <label className="settings-field"><span>Password</span><span className="settings-password-control"><input type={passwordVisible ? 'text' : 'password'} /><button type="button" onClick={() => setPasswordVisible(value => !value)}>{passwordVisible ? 'Hide' : 'Show'}</button></span><small>Password must be between 6 and 16 characters without any special characters.</small></label>
        </div> : activeTab === 'settings' ? <div className="settings-template" role="tabpanel">
          <label className="settings-template-field"><span>Activity Settings Template *</span><select value={settingsTemplate} onChange={event => setSettingsTemplate(event.target.value)}><option>Quiz</option><option>Practice</option><option>Homework</option></select><small>Apply a settings template and customize as needed</small></label>
        </div> : <StudentAccommodation />}
      </div>
      <div className="settings-footer"><Button color={ButtonColor.primary} size={ButtonSize.medium} onClick={onBack}>Save</Button></div>
    </div>
  );
}

function ActivityPreview({ activity, onBack }) {
  const title = activity.id === 'activity-1' ? 'Chapter 01 Concept Check 1: Principles of Economics' : `Chapter 01 ${activity.title}: Principles of Economics`;
  return (
    <div className="activity-preview">
      <div className="preview-heading">
        <Button color={ButtonColor.secondary} size={ButtonSize.small} onClick={onBack}><span className="preview-back-arrow" aria-hidden="true">←</span> Back</Button>
        <h2>{title}</h2>
      </div>
      <div className="preview-content">
        <div className="preview-inner">
          <div className="preview-actionbar">
            <div className="preview-view-toggle"><button type="button">View as Instructor</button><button type="button" className="selected">✓ View as Student</button></div>
            <div className="preview-icon-actions"><button type="button" aria-label="Print activity"><PrintIcon size={16} /></button><button type="button" aria-label="Edit activity">✎</button></div>
            <button type="button" className="preview-details">Activity Details <span aria-hidden="true">↗</span></button>
          </div>
          <div className="preview-main">
            <div className="preview-player">
              <div className="preview-progress">
                <div><span>1 of 10</span><i /> <span>1 Point</span></div>
                <div className="preview-progress-track"><span /></div>
              </div>
              <div className="preview-question">
                <p>When GDP is <input aria-label="Fill in the blank" value="growing" readOnly />, businesses are generally better off than when it is not.</p>
                <p>GDP is calculated by subtracting the value of all goods and services produced, plus the value of all goods and services used to produce them.</p>
                <label><input type="radio" name="preview-answer" /> True</label>
                <label><input type="radio" name="preview-answer" defaultChecked /> False</label>
              </div>
              <div className="preview-pagination"><button type="button" aria-label="Previous question">←</button>{Array.from({ length: 10 }, (_, index) => <button key={index} type="button" className={index === 0 ? 'current' : ''}>{index + 1}</button>)}<button type="button" className="next">Next <span aria-hidden="true">→</span></button></div>
            </div>
            <aside className="preview-rail"><button type="button" aria-label="Activity checklist">☷</button><button type="button" aria-label="Accessibility">♙</button><button type="button" aria-label="Flag activity">⚑</button><button type="button" className="rail-collapse" aria-label="Collapse activity rail">‹</button></aside>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditActivityContentDialog({ activity, onBack }) {
  const activityName = activity.id === 'activity-1' ? 'Check Your Understanding #1' : activity.title;
  return (
    <div className="edit-content-dialog">
      <div className="edit-content-heading"><Button color={ButtonColor.secondary} size={ButtonSize.small} onClick={onBack}><span className="preview-back-arrow" aria-hidden="true">←</span> Back</Button></div>
      <div className="edit-content-panel">
        <h2>Open in MindTap?</h2>
        <div className="edit-content-message">
          <p>To edit {activityName} and its content, open this activity in MindTap.</p>
          <p>Any changes you make there will be reflected in your course content.</p>
        </div>
      </div>
      <div className="edit-content-actions">
        <Button color={ButtonColor.secondary} size={ButtonSize.medium} onClick={onBack}>Cancel</Button>
        <Button color={ButtonColor.primary} size={ButtonSize.medium} onClick={onBack}>Open MindTap</Button>
      </div>
    </div>
  );
}

function ImportCompleted({ onReturn, onViewLinks }) {
  return (
    <div className="import-completed-dialog">
      <h2>Import Completed</h2>
      <div className="import-completed-actions">
        <Button color={ButtonColor.secondary} size={ButtonSize.medium} onClick={onViewLinks}>View Links</Button>
        <Button color={ButtonColor.primary} size={ButtonSize.medium} onClick={onReturn}>Return to Select Content</Button>
      </div>
    </div>
  );
}

function LinkSelectionDialog({ includeFolder, includeActivities, includeGradebookSync, onToggleFolder, onToggleActivities, onToggleGradebookSync, onCancel, onImport }) {
  return (
    <div className="link-selection-dialog">
      <h2>What links would you like to be imported?</h2>
      <div className="link-selection-options" role="group" aria-label="Links to import">
        <SelectBox label="Include a link to the folder selected" checked={includeFolder} onChange={onToggleFolder} isTextVisuallyHidden={false} />
        <SelectBox label="Include a link to every activity selected" checked={includeActivities} onChange={onToggleActivities} isTextVisuallyHidden={false} />
        <SelectBox label="Include a link to Gradebook Sync" checked={includeGradebookSync} onChange={onToggleGradebookSync} isTextVisuallyHidden={false} />
      </div>
      <div className="link-selection-actions">
        <Button color={ButtonColor.secondary} size={ButtonSize.medium} onClick={onCancel}>Cancel</Button>
        <Button color={ButtonColor.primary} size={ButtonSize.medium} onClick={onImport}>Confirm</Button>
      </div>
    </div>
  );
}

function TreeHeading({ id, label, count, expanded, selected, onSelect, onToggle, level = 0 }) {
  const handleToggle = event => {
    event.preventDefault();
    event.stopPropagation();
    onToggle();
  };
  const toggleFromHeading = event => {
    if (!count || event.target.closest('.row-check, .activity-more')) return;
    onToggle();
  };
  return (
    <div className={`picker-tree-heading level-${level}${count ? ' clickable-folder' : ''}`} onClick={toggleFromHeading}>
      <SelectBox label={`Select ${label}`} checked={selected} onChange={onSelect} />
      <button type="button" className="tree-toggle" aria-label={`${expanded ? 'Collapse' : 'Expand'} ${label}`} aria-expanded={expanded} aria-controls={count ? `${id}-content` : undefined} onClick={handleToggle}>{expanded ? '⌃' : '›'}</button>
      <button type="button" className="tree-label" aria-label={`${expanded ? 'Collapse' : 'Expand'} ${label}`} onClick={event => { event.stopPropagation(); onToggle(); }}>{label}</button>
      {count && <span className="activity-count">{count} activities</span>}
      {count && <FolderMenu title={label} />}
    </div>
  );
}

function ContentPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [contentSelectorMode, setContentSelectorMode] = useState(false);
  const [isDatesOpen, setIsDatesOpen] = useState(false);
  const [activeView, setActiveView] = useState('list');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [contentTypeFilter, setContentTypeFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showHidden, setShowHidden] = useState(false);
  const [expanded, setExpanded] = useState({ chapter1: true, chapter1Learn: false, chapter1Study: false, chapter1Apply: true, chapter2: true, learnIt: true, studyIt: true });
  const [selected, setSelected] = useState(() => new Set());
  const [trigger, setTrigger] = useState(null);
  const [previewActivity, setPreviewActivity] = useState(null);
  const [settingsActivity, setSettingsActivity] = useState(null);
  const [editContentActivity, setEditContentActivity] = useState(null);
  const [linkSelectionOpen, setLinkSelectionOpen] = useState(false);
  const [includeFolderLink, setIncludeFolderLink] = useState(false);
  const [includeActivityLinks, setIncludeActivityLinks] = useState(true);
  const [includeGradebookSync, setIncludeGradebookSync] = useState(true);
  const [importCompleted, setImportCompleted] = useState(false);

  const toggleSelection = useCallback(id => setSelected(current => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  }), []);
  const selectGroup = useCallback((ids, checked) => setSelected(current => {
    const next = new Set(current);
    ids.forEach(id => checked ? next.add(id) : next.delete(id));
    return next;
  }), []);
  const chapter1DescendantIds = chapter1Sections.flatMap(section => [section.id, ...(section.reading ? [section.reading.id] : []), ...section.activities.map(item => item.id), ...(section.resources || []).map(item => item.id)]);
  const allIds = useMemo(() => ['chapter-1',...chapter1DescendantIds,'chapter-2','learn-it','read-chapter',...activities.map(item => item.id),'study-it','flashcards','powerpoints', ...(showHidden ? ['hidden-resource'] : [])], [showHidden]);
  const folderSelectionIds = ['chapter-1',...chapter1Sections.map(section => section.id),'chapter-2','learn-it','study-it'];
  const activitySelectionIds = [...chapter1Sections.flatMap(section => [...(section.reading ? [section.reading.id] : []), ...section.activities.map(item => item.id), ...(section.resources || []).map(item => item.id)]),'read-chapter',...activities.map(item => item.id),'flashcards','powerpoints','hidden-resource'];
  const showActivityContent = contentTypeFilter !== 'readings' && availabilityFilter !== 'unavailable';
  const showReadingContent = contentTypeFilter !== 'activities' && availabilityFilter !== 'unavailable';
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const matchesSearch = value => !normalizedQuery || value.toLowerCase().includes(normalizedQuery);
  const visibleActivities = showActivityContent ? activities.filter(item => matchesSearch(item.title)) : [];
  const visibleStudyItems = showReadingContent ? ['flashcards','powerpoints',...(showHidden ? ['hidden-resource'] : [])].filter(id => matchesSearch(id === 'flashcards' ? 'Flashcards' : id === 'powerpoints' ? 'PowerPoints' : 'Hidden Resource')) : [];
  const visibleReadChapter = showReadingContent && matchesSearch('Read Chapter #');
  const showAllChapter2 = matchesSearch('Chapter 2');
  const showLearnIt = !normalizedQuery || showAllChapter2 || matchesSearch('Learn It') || visibleReadChapter || visibleActivities.length > 0;
  const showStudyIt = !normalizedQuery || showAllChapter2 || matchesSearch('Study It') || visibleStudyItems.length > 0;
  const showChapter1 = !normalizedQuery || matchesSearch('Chapter 1') || chapter1Sections.some(section => matchesSearch(section.label) || (section.reading && matchesSearch(section.reading.title)) || section.activities.some(item => matchesSearch(item.title)) || (section.resources || []).some(item => matchesSearch(item.title)));
  const showChapter1Section = section => !normalizedQuery || matchesSearch('Chapter 1') || matchesSearch(section.label) || (section.reading && matchesSearch(section.reading.title)) || section.activities.some(item => matchesSearch(item.title)) || (section.resources || []).some(item => matchesSearch(item.title));
  const showChapter2 = !normalizedQuery || showAllChapter2 || showLearnIt || showStudyIt;
  const searchHasResults = showChapter1 || showChapter2;
  const openLinkSelection = () => {
    setIncludeFolderLink(false);
    setIncludeActivityLinks(true);
    setIncludeGradebookSync(true);
    const hasSelectedFolder = folderSelectionIds.some(id => selected.has(id));
    const hasSelectedActivity = activitySelectionIds.some(id => selected.has(id));
    if (hasSelectedFolder && hasSelectedActivity) setLinkSelectionOpen(true);
    else setImportCompleted(true);
  };

  useEffect(() => {
    const modeButton = document.querySelector('.student');
    const syncModeButton = () => {
      if (!modeButton) return;
      modeButton.textContent = contentSelectorMode ? '← Edit Mode' : '▤ Content Selector';
      modeButton.setAttribute('aria-pressed', String(contentSelectorMode));
      modeButton.setAttribute('aria-label', contentSelectorMode ? 'Return to edit mode' : 'Switch to content selector mode');
    };
    syncModeButton();
    const handleModeClick = () => {
      if (contentSelectorMode) {
        setContentSelectorMode(false);
        setIsOpen(false);
      } else {
        setContentSelectorMode(true);
        setPreviewActivity(null);
        setSettingsActivity(null);
        setEditContentActivity(null);
        setLinkSelectionOpen(false);
        setImportCompleted(false);
        setTrigger(modeButton);
        setIsOpen(true);
      }
    };
    modeButton?.addEventListener('click', handleModeClick);
    return () => modeButton?.removeEventListener('click', handleModeClick);
  }, [contentSelectorMode]);

  useEffect(() => {
    const openFromCardButton = button => {
      setTrigger(button);
      setPreviewActivity(null);
      setSettingsActivity(null);
      setEditContentActivity(null);
      setLinkSelectionOpen(false);
      setImportCompleted(false);
      setIsOpen(true);
    };
    const openFromCard = event => {
      const target = event.target instanceof Element ? event.target : event.target?.parentElement;
      const button = target?.closest('.product-card .select-content');
      if (button) openFromCardButton(button);
    };
    // Product cards are rendered by the static course shell rather than React.
    // Bind their buttons directly so opening the picker does not depend on the
    // event bubbling through that separate shell.
    const cardButtons = [...document.querySelectorAll('.product-card .select-content')];
    const openBoundCard = event => openFromCardButton(event.currentTarget);
    cardButtons.forEach(button => button.addEventListener('click', openBoundCard));
    const openFromModule = event => {
      setTrigger(event.detail?.trigger || null);
      setPreviewActivity(null);
      setSettingsActivity(null);
      setEditContentActivity(null);
      setLinkSelectionOpen(false);
      setImportCompleted(false);
      setSelected(new Set());
      setIsOpen(true);
    };
    document.addEventListener('click', openFromCard);
    document.addEventListener('open-content-picker', openFromModule);
    return () => {
      cardButtons.forEach(button => button.removeEventListener('click', openBoundCard));
      document.removeEventListener('click', openFromCard);
      document.removeEventListener('open-content-picker', openFromModule);
    };
  }, []);

  const close = () => {
    setIsOpen(false);
    setPreviewActivity(null);
    setSettingsActivity(null);
    setEditContentActivity(null);
    setLinkSelectionOpen(false);
    setImportCompleted(false);
    requestAnimationFrame(() => trigger?.focus());
  };
  const backToPicker = () => setPreviewActivity(null);
  const toggleAll = () => {
    const shouldExpand = !Object.values(expanded).every(Boolean);
    setExpanded(Object.fromEntries(Object.keys(expanded).map(key => [key, shouldExpand])));
  };
  const toggleChecked = (id, ids = [id]) => event => {
    if (ids.length > 1) selectGroup(ids, event.target.checked);
    else toggleSelection(id);
  };

  return (
    <ThemeContext.Provider value={magma}>
      <Modal
        isOpen={isOpen}
        onClose={close}
        header={previewActivity || settingsActivity || editContentActivity || importCompleted || linkSelectionOpen ? null : 'Select Content'}
        ariaLabel={settingsActivity ? 'Activity settings' : previewActivity ? 'Activity preview' : editContentActivity ? 'Open in MindTap' : importCompleted ? 'Import completed' : linkSelectionOpen ? 'Choose content to link' : undefined}
        headerLevel={2}
        size={ModalSize.large}
        className="magma-picker-modal"
        containerStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 0 }}
        style={{ width: importCompleted ? 'min(480px, calc(100vw - 24px))' : linkSelectionOpen ? 'min(660px, calc(100vw - 24px))' : editContentActivity ? 'min(767px, calc(100vw - 24px))' : settingsActivity ? 'min(954px, calc(100vw - 40px))' : 'min(890px, calc(100vw - 40px))', maxWidth: importCompleted ? '480px' : linkSelectionOpen ? '660px' : editContentActivity ? '767px' : settingsActivity ? '954px' : '890px', height: importCompleted ? 'min(200px, calc(100vh - 24px))' : linkSelectionOpen ? 'min(360px, calc(100vh - 24px))' : editContentActivity ? 'min(404px, calc(100vh - 24px))' : settingsActivity ? 'min(593px, calc(100vh - 40px))' : 'min(560px, calc(100vh - 40px))', display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0, margin: 0 }}
      >
        {importCompleted ? <ImportCompleted onReturn={() => setImportCompleted(false)} onViewLinks={() => { setIsOpen(false); setImportCompleted(false); document.querySelector('.course-nav a[data-view="modules"]')?.click(); }} /> : linkSelectionOpen ? <LinkSelectionDialog includeFolder={includeFolderLink} includeActivities={includeActivityLinks} includeGradebookSync={includeGradebookSync} onToggleFolder={() => setIncludeFolderLink(value => !value)} onToggleActivities={() => setIncludeActivityLinks(value => !value)} onToggleGradebookSync={() => setIncludeGradebookSync(value => !value)} onCancel={() => setLinkSelectionOpen(false)} onImport={() => { setLinkSelectionOpen(false); setImportCompleted(true); }} /> : editContentActivity ? <EditActivityContentDialog activity={editContentActivity} onBack={() => setEditContentActivity(null)} /> : settingsActivity ? <ActivitySettings activity={settingsActivity} onBack={() => setSettingsActivity(null)} /> : previewActivity ? <ActivityPreview activity={previewActivity} onBack={backToPicker} /> : <div className="picker-shell">
          <div className="picker-search">
            <input type="search" aria-label="Search content" placeholder="Search" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} />
            <SearchIcon size={18} aria-hidden="true" />
          </div>
          <div className="picker-toolbar">
            <div className="toolbar-left">
              <SelectBox label="Select all content" checked={allIds.every(id => selected.has(id))} onChange={toggleChecked('all', allIds)} />
              <PickerButton icon={<UnfoldMoreIcon size={16} />} onClick={toggleAll}>{Object.values(expanded).some(Boolean) ? 'Collapse All' : 'Expand All'}</PickerButton>
              <PickerButton icon={<VisibilityIcon size={16} />} onClick={() => setShowHidden(value => !value)}>{showHidden ? 'Hide Hidden' : 'Show Hidden'}</PickerButton>
              <PickerButton icon={<FilterListIcon size={16} />} active={filtersOpen} aria-expanded={filtersOpen} onClick={() => setFiltersOpen(value => !value)}>Filters</PickerButton>
            </div>
            <div className="toolbar-right">
              <PickerButton icon={<ListIcon size={16} />} active={activeView === 'list'} onClick={() => setActiveView('list')}>List View</PickerButton>
              <PickerButton icon={<CalendarTodayIcon size={16} />} active={activeView === 'week'} onClick={() => setActiveView('week')}>Week View</PickerButton>
            </div>
          </div>
          {filtersOpen && <div className="picker-filters" aria-label="Content filters">
            <label>Content type<select value={contentTypeFilter} onChange={event => setContentTypeFilter(event.target.value)}><option value="all">All types</option><option value="activities">Activities</option><option value="readings">Readings</option></select></label>
            <label>Availability<select value={availabilityFilter} onChange={event => setAvailabilityFilter(event.target.value)}><option value="all">All content</option><option value="available">Available</option><option value="unavailable">Unavailable</option></select></label>
          </div>}
          {activeView === 'list' ? (
            <div className="picker-list" role="tree" aria-label="Course content">
              {showChapter1 && <div className="tree-section">
                <TreeHeading id="chapter1" label="Chapter 1" count={chapter1Sections.reduce((count, section) => count + section.activities.length + (section.resources || []).length, 0)} expanded={expanded.chapter1} selected={selected.has('chapter-1')} onSelect={toggleChecked('chapter-1',['chapter-1',...chapter1DescendantIds])} onToggle={() => setExpanded(value => ({ ...value, chapter1: !value.chapter1 }))} />
                {(expanded.chapter1 || normalizedQuery) && <div className="tree-children" id="chapter1-content">
                  {chapter1Sections.filter(showChapter1Section).map(section => <React.Fragment key={section.id}>
                    <TreeHeading id={section.id} level={1} label={section.label} count={section.activities.length + (section.resources || []).length} expanded={expanded[section.key] || Boolean(normalizedQuery)} selected={selected.has(section.id)} onSelect={toggleChecked(section.id,[section.id,...(section.reading ? [section.reading.id] : []),...section.activities.map(item => item.id),...(section.resources || []).map(item => item.id)])} onToggle={() => setExpanded(value => ({ ...value, [section.key]: !value[section.key] }))} />
                    {(expanded[section.key] || normalizedQuery) && <div className="activity-list" id={`${section.id}-content`}>
                      {section.reading && showReadingContent && (!normalizedQuery || matchesSearch('Chapter 1') || matchesSearch(section.label) || matchesSearch(section.reading.title)) && <div className="picker-row read-row"><div className="row-check"><SelectBox label={`Select ${section.reading.title}`} checked={selected.has(section.reading.id)} onChange={toggleChecked(section.reading.id)} /></div><div className="row-icon" aria-hidden="true"><BookIcon size={24} /></div><div className="row-copy">{section.reading.title}</div><button className="row-menu" type="button" aria-label={`${section.reading.title} options`}><MoreVertIcon size={16} /></button></div>}
                      {section.activities.filter(item => !normalizedQuery || matchesSearch('Chapter 1') || matchesSearch(section.label) || matchesSearch(item.title)).map(item => <ActivityRow key={item.id} item={item} selected={selected.has(item.id)} onSelect={toggleChecked(item.id)} onPreview={() => setPreviewActivity(item)} onManageSettings={() => setSettingsActivity(item)} onEditContent={() => setEditContentActivity(item)} />)}
                      {(section.resources || []).filter(item => !normalizedQuery || matchesSearch('Chapter 1') || matchesSearch(section.label) || matchesSearch(item.title)).map(item => <div key={item.id} className="picker-row read-row"><div className="row-check"><SelectBox label={`Select ${item.title}`} checked={selected.has(item.id)} onChange={toggleChecked(item.id)} /></div><div className="row-icon">{item.icon === 'flashcards' ? '▣?' : '▤'}</div><div className="row-copy">{item.title}</div><button className="row-menu" type="button" aria-label={`${item.title} options`}>⋮</button></div>)}
                    </div>}
                  </React.Fragment>)}
                </div>}
              </div>}
              {showChapter2 && <div className="tree-section">
                <TreeHeading id="chapter2" label="Chapter 2" count="7" expanded={expanded.chapter2} selected={selected.has('chapter-2')} onSelect={toggleChecked('chapter-2',['chapter-2','learn-it','read-chapter',...activities.map(item => item.id),'study-it','flashcards','powerpoints',...(showHidden?['hidden-resource']:[])])} onToggle={() => setExpanded(value => ({ ...value, chapter2: !value.chapter2 }))} />
                {(expanded.chapter2 || normalizedQuery) && <div className="tree-children" id="chapter2-content">
                  {showLearnIt && <TreeHeading id="learnIt" level={1} label="Learn It" count="7" expanded={expanded.learnIt || Boolean(normalizedQuery)} selected={selected.has('learn-it')} onSelect={toggleChecked('learn-it',['learn-it','read-chapter',...activities.map(item => item.id)])} onToggle={() => setExpanded(value => ({ ...value, learnIt: !value.learnIt }))} />}
                  {(expanded.learnIt || normalizedQuery) && showLearnIt && <div className="activity-list" id="learnIt-content">
                    {visibleReadChapter && (showAllChapter2 || matchesSearch('Learn It') || matchesSearch('Read Chapter #')) && <div className="picker-row read-row"><div className="row-check"><SelectBox label="Select Read Chapter #" checked={selected.has('read-chapter')} onChange={toggleChecked('read-chapter')} /></div><div className="row-icon" aria-hidden="true"><BookIcon size={24} /></div><div className="row-copy">Read Chapter #</div><button className="row-menu" type="button" aria-label="Read Chapter options"><MoreVertIcon size={16} /></button></div>}
                    {visibleActivities.filter(item => !normalizedQuery || showAllChapter2 || matchesSearch('Learn It') || matchesSearch(item.title)).map(item => <ActivityRow key={item.id} item={item} selected={selected.has(item.id)} onSelect={toggleChecked(item.id)} onPreview={() => setPreviewActivity(item)} onManageSettings={() => setSettingsActivity(item)} onEditContent={() => setEditContentActivity(item)} />)}
                  </div>}
                  {showStudyIt && <TreeHeading id="studyIt" level={1} label="Study It" count="7" expanded={expanded.studyIt || Boolean(normalizedQuery)} selected={selected.has('study-it')} onSelect={toggleChecked('study-it',['study-it','flashcards','powerpoints',...(showHidden?['hidden-resource']:[])])} onToggle={() => setExpanded(value => ({ ...value, studyIt: !value.studyIt }))} />}
                  {(expanded.studyIt || normalizedQuery) && showStudyIt && <div className="activity-list" id="studyIt-content">
                    {visibleStudyItems.filter(id => !normalizedQuery || showAllChapter2 || matchesSearch('Study It') || matchesSearch(id === 'flashcards' ? 'Flashcards' : id === 'powerpoints' ? 'PowerPoints' : 'Hidden Resource')).map((id,index) => <div key={id} className="picker-row read-row"><div className="row-check"><SelectBox label={`Select ${id}`} checked={selected.has(id)} onChange={toggleChecked(id)} /></div><div className="row-icon">{index===0?'▣?':'▤'}</div><div className="row-copy">{id==='flashcards'?'Flashcards':id==='powerpoints'?'PowerPoints':'Hidden Resource'}</div><button className="row-menu" type="button" aria-label={`${id} options`}>⋮</button></div>)}
                  </div>}
                </div>}
              </div>}
              {!searchHasResults && <p className="picker-no-results">No content found for “{searchQuery}”.</p>}
            </div>
          ) : <div className="week-placeholder">Week View</div>}
          <div className={`picker-actions-row${selected.size > 0 ? ' has-selection' : ''}`}>
          {selected.size > 0 && <div className="bulk-action-bar" role="toolbar" aria-label="Actions for selected content">
            <div className="bulk-selection-group">
              <button type="button" className="bulk-close" aria-label="Clear selection" onClick={() => setSelected(new Set())}>×</button>
              <span className="bulk-selected-count">{selected.size} selected</span>
            </div>
            <span className="bulk-divider" aria-hidden="true" />
            <div className="bulk-action-buttons">
              <button type="button"><VisibilityOffIcon size={16} />Hide</button>
              <button type="button"><VisibilityIcon size={16} />Show</button>
              <button type="button" aria-haspopup="dialog" aria-controls="bulk-dates-modal" onClick={() => { setIsOpen(false); setIsDatesOpen(true); }}><CalendarTodayIcon size={16} />Set Dates</button>
              <button type="button"><EditIcon size={16} />Edit Points</button>
              <button type="button"><EditIcon size={16} />Edit Practice Vs Graded</button>
              <Dropdown width={220} alignment={DropdownAlignment.end} dropDirection={DropdownDropDirection.up}>
                <DropdownButton className="bulk-more" aria-label="More selected content actions" variant="link" size={ButtonSize.small}>⋮</DropdownButton>
                <DropdownContent className="activity-menu">
                  <DropdownMenuItem icon={<PersonIcon size={18} />} onClick={() => {}}>Edit Accommodation</DropdownMenuItem>
                  <DropdownMenuItem icon={<AssignmentIcon size={18} />} onClick={() => {}}>Apply Setting Template</DropdownMenuItem>
                  <DropdownMenuItem icon={<LockIcon size={18} />} onClick={() => {}}>Edit password</DropdownMenuItem>
                  <DropdownMenuItem icon={<ScheduleIcon size={18} />} onClick={() => {}}>Edit late policy</DropdownMenuItem>
                  <DropdownMenuItem icon={<AccessTimeIcon size={18} />} onClick={() => {}}>Edit time limit</DropdownMenuItem>
                </DropdownContent>
              </Dropdown>
            </div>
            <span className="bulk-divider" aria-hidden="true" />
            <button type="button" className="bulk-link-action" onClick={openLinkSelection}>Link to LMS</button>
          </div>}
          <div className="picker-footer"><Button color={ButtonColor.primary} size={ButtonSize.medium} onClick={openLinkSelection} disabled={selected.size === 0}>Done</Button></div>
          </div>
        </div>}
      </Modal>
      <BulkDatesModal isOpen={isDatesOpen} activityCount={selected.size} onClose={() => setIsDatesOpen(false)} onBack={() => { setIsDatesOpen(false); setIsOpen(true); }} />
    </ThemeContext.Provider>
  );
}

export default ContentPicker;
