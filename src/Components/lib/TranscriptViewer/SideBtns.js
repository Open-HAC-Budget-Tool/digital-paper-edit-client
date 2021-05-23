import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import subtitlesExportOptionsList from 'slate-transcript-editor/util/export-adapters/subtitles-generator/list.js';
import InfoOutlined from '@material-ui/icons/InfoOutlined';

function SideBtns({
  handleExport,
  optionalBtns,
}) {
  const [anchorMenuEl, setAnchorMenuEl] = useState(null);

  // used by MUI export menu
  const handleMenuClose = () => {
    setAnchorMenuEl(null);
  };

  // used by MUI export menu
  const handleMenuClick = (event) => {
    setAnchorMenuEl(event.currentTarget);
  };

  return (
    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
      <div>
        <Tooltip title={'Export options'}>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
            <SaveAltIcon color="primary" /> <KeyboardArrowDownIcon color="primary" />
          </Button>
        </Tooltip>
        <Menu id="simple-menu" anchorEl={anchorMenuEl} keepMounted open={Boolean(anchorMenuEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose} disabled>
            <Link style={{ color: 'black' }}>Text Export</Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: 'text',
                ext: 'txt',
                speakers: false,
                timecodes: false,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary">
              Text (<code>.txt</code>)
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: 'text',
                ext: 'txt',
                speakers: true,
                timecodes: false,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary">Text (Speakers)</Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: 'text',
                ext: 'txt',
                speakers: false,
                timecodes: true,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary">Text (Timecodes)</Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: 'text',
                ext: 'txt',
                speakers: true,
                timecodes: true,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary"> Text (Speakers & Timecodes)</Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: 'text',
                ext: 'txt',
                speakers: true,
                timecodes: true,
                atlasFormat: true,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary"> Text (Atlas format)</Link>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleExport({
                type: 'word',
                ext: 'docx',
                speakers: false,
                timecodes: false,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary">
              {' '}
              Word (<code>.docx</code>)
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: 'word',
                ext: 'docx',
                speakers: true,
                timecodes: false,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary"> Word (Speakers)</Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: 'word',
                ext: 'docx',
                speakers: false,
                timecodes: true,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary"> Word (Timecodes)</Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: 'word',
                ext: 'docx',
                speakers: true,
                timecodes: true,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary"> Word (Speakers & Timecodes)</Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: 'word',
                ext: 'docx',
                speakers: false,
                timecodes: false,
                inlineTimecodes: true,
                hideTitle: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary"> Word (OHMS)</Link>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose} disabled>
            <Link style={{ color: 'black' }}>Closed Captions Export</Link>
          </MenuItem>
          {subtitlesExportOptionsList.map(({ type, label, ext }, index) => {
            return (
              <MenuItem
                key={index + label}
                onClick={() => {
                  handleExport({ type, ext, isDownload: true });
                  handleMenuClose();
                }}
              >
                <Link color="primary">
                  {label} (<code>.{ext}</code>)
                </Link>
              </MenuItem>
            );
          })}
          <Divider />
          <MenuItem onClick={handleMenuClose} disabled>
            <Link style={{ color: 'black' }}>Developer options</Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: 'json-slate',
                ext: 'json',
                speakers: true,
                timecodes: true,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary">
              SlateJs (<code>.json</code>)
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: 'json-digitalpaperedit',
                ext: 'json',
                speakers: true,
                timecodes: true,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary">
              DPE (<code>.json</code>)
            </Link>
          </MenuItem>
        </Menu>
      </div>
      <Tooltip title={' Double click on a word to jump to the corresponding point in the media'}>
        <Button color="primary">
          <InfoOutlined color="primary" />
        </Button>
      </Tooltip>
      {optionalBtns}
    </Grid>
  );
}

export default SideBtns;