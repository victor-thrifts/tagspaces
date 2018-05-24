/**
 * TagSpaces - universal file and folder organizer
 * Copyright (C) 2017-present TagSpaces UG (haftungsbeschraenkt)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License (version 3) as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @flow
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from 'material-ui/styles';
import List, {
  // ListItemIcon,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Switch from 'material-ui/Switch';
import Input from 'material-ui/Input';
// import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import i18n from '../../services/i18n';
import {
  actions as SettingsActions,
  getSettings
} from '../../reducers/settings';
import ColorPickerDialog from '../dialogs/ColorPickerDialog';

const styles = theme => ({
  root: {
    maxHeight: 500,
    overflowY: 'overlay'
  },
  pro: {
    backgroundColor: '#1DD19F'
  },
  colorChooserButton: {
    border: '1px solid lightgray'
  }
});

type Props = {
  setTagColor: string,
  setTagTextColor: string,
  classes: Object,
  settings: Object,
  setShowUnixHiddenEntries: () => void,
  setCurrentTheme: () => void,
  setLanguage: () => void,
  setDesktopMode: () => void,
  setCheckForUpdates: () => void,
  setUseDefaultLocation: () => void,
  setColoredFileExtension: () => void,
  setShowTagAreaOnStartup: () => void,
  setLoadsLocationMetaData: () => void,
  setSearchInSubfolders: () => void,
  setWatchCurrentDirectory: () => void,
  setCalculateTags: () => void,
  setUseTrashCan: () => void,
  setPersistTagsInSidecarFile: () => void,
  setUseGenerateThumbnails: () => void
};

type State = {
  color?: string
};

class SettingsGeneral extends React.Component<Props, State> {
  state = {
    color: ''
  };

  toggleDefaultTagBackgroundColorPicker = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  toggleDefaultTagTextColorPicker = () => {
    this.setState({
      displayTextColorPicker: !this.state.displayTextColorPicker
    });
  };

  handleChangeColor = color => {
    this.setState({ color });
    this.props.setTagColor(color);
  };

  handleChangeTextColor = color => {
    this.setState({ textcolor: color });
    this.props.setTagTextColor(color);
  };

  handleChange = event => {
    this.setState({ currentTheme: event.target.value });
  };

  render() {
    const classes = this.props.classes;

    return (
      <List className={classes.root}>
        <ListItem>
          <ListItemText primary={i18n.t('core:interfaceLanguage')} />
          <Select
            data-tid="settingsSetLanguage"
            native
            value={this.props.settings.interfaceLanguage}
            onChange={event => {
              this.props.setLanguage(event.target.value);
            }}
            input={<Input id="languageSelector" />}
          >
            {this.props.settings.supportedLanguages.map(language => (
              <option key={language.iso} value={language.iso}>
                {language.title}
              </option>
            ))}
          </Select>
        </ListItem>
        <ListItem>
          <ListItemText primary={i18n.t('core:themeSelector')} />
          <Select
            data-tid="settingsSetCurrentTheme"
            value={this.props.settings.currentTheme}
            onChange={event => this.props.setCurrentTheme(event.target.value)}
            input={<Input id="themeSelector" />}
          >
            {this.props.settings.supportedThemes.map(theme => (
              <MenuItem key={theme} value={theme}>
                {theme}
              </MenuItem>
            ))}
          </Select>
        </ListItem>
        <ListItem>
          <ListItemText primary={i18n.t('core:showUnixHiddenFiles')} />
          <ListItemSecondaryAction>
            <Switch
              data-tid="settingsSetShowUnixHiddenEntries"
              onClick={() =>
                this.props.setShowUnixHiddenEntries(
                  !this.props.settings.showUnixHiddenEntries
                )
              }
              checked={this.props.settings.showUnixHiddenEntries}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary={i18n.t('core:checkForNewVersionOnStartup')} />
          <ListItemSecondaryAction>
            <Switch
              data-tid="settingsSetCheckForUpdates"
              onClick={() =>
                this.props.setCheckForUpdates(
                  !this.props.settings.checkForUpdates
                )
              }
              checked={this.props.settings.checkForUpdates}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary={i18n.t('core:coloredFileExtensionsEnabled')} />
          <ListItemSecondaryAction>
            <Switch
              data-tid="settingsSetColoredFileExtension"
              onClick={() =>
                this.props.setColoredFileExtension(
                  !this.props.settings.coloredFileExtension
                )
              }
              checked={this.props.settings.coloredFileExtension}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary={i18n.t('core:loadLocationMetaData')} />
          <ListItemSecondaryAction>
            <Switch
              data-tid="settingsSetLoadsLocationMetaData"
              onClick={() =>
                this.props.setLoadsLocationMetaData(
                  !this.props.settings.loadsLocationMetaData
                )
              }
              checked={this.props.settings.loadsLocationMetaData}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary={i18n.t('core:tagBackgroundColor')} />
          <ListItemSecondaryAction>
            <Button
              data-tid="settingsToggleDefaultTagBackgroundColor"
              className={classes.colorChooserButton}
              size="small"
              style={{
                backgroundColor: this.props.settings.tagBackgroundColor
              }}
              onClick={this.toggleDefaultTagBackgroundColorPicker}
            >
              &nbsp;
            </Button>
            <ColorPickerDialog
              open={this.state.displayColorPicker}
              setColor={this.handleChangeColor}
              onClose={this.toggleDefaultTagBackgroundColorPicker}
              color={this.props.settings.tagBackgroundColor}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary={i18n.t('core:tagForegroundColor')} />
          <ListItemSecondaryAction>
            <Button
              data-tid="settingsToggleDefaultTagForegroundColor"
              className={classes.colorChooserButton}
              size="small"
              style={{ backgroundColor: this.props.settings.tagTextColor }}
              onClick={this.toggleDefaultTagTextColorPicker}
            >
              &nbsp;
              <div style={styles.textcolor} />
            </Button>
            <ColorPickerDialog
              open={this.state.displayTextColorPicker}
              setColor={this.handleChangeTextColor}
              onClose={this.toggleDefaultTagTextColorPicker}
              color={this.props.settings.tagTextColor}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary={i18n.t('core:useTrashCan')} />
          <ListItemSecondaryAction>
            <Switch
              data-tid="settingsSetUseTrashCan"
              onClick={() =>
                this.props.setUseTrashCan(!this.props.settings.useTrashCan)
              }
              checked={this.props.settings.useTrashCan}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary={i18n.t('core:persistTagsInSidecarFile')} />
          <ListItemSecondaryAction>
            <Switch
              data-tid="settingsSetPersistTagsInSidecarFile"
              onClick={() =>
                this.props.setPersistTagsInSidecarFile(
                  !this.props.settings.persistTagsInSidecarFile
                )
              }
              checked={this.props.settings.persistTagsInSidecarFile}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary={i18n.t('core:useGenerateThumbnails')} />
          <ListItemSecondaryAction>
            <Switch
              data-tid="settingsUseGenerateThumbnails"
              onClick={() =>
                this.props.setUseGenerateThumbnails(
                  !this.props.settings.useGenerateThumbnails
                )
              }
              checked={this.props.settings.useGenerateThumbnails}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    );
  }
}

/*
        <ListItem>
          <ListItemText primary={i18n.t('core:desktopMode')} />
          <ListItemSecondaryAction>
            <Switch
              data-tid="settingsSetDesktopMode"
              onClick={() =>
                this.props.setDesktopMode(!this.props.settings.desktopMode)
              }
              checked={this.props.settings.desktopMode}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <span className={this.props.classes.pro}>pro</span>
          <ListItemText primary={i18n.t('core:calculateTag')} />
          <ListItemSecondaryAction>
            <Switch
              data-tid="settingsSetCalculateTags"
              onClick={() =>
                this.props.setCalculateTags(!this.props.settings.calculateTags)
              }
              checked={this.props.settings.calculateTags}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary={i18n.t('core:watchCurrentDirectory')} />
          <ListItemSecondaryAction>
            <Switch
              data-tid="settingsSetWatchCurrentDirectory"
              onClick={() =>
                this.props.setWatchCurrentDirectory(
                  !this.props.settings.watchCurrentDirectory
                )
              }
              checked={this.props.settings.watchCurrentDirectory}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary={i18n.t('core:useSearchInSubfolders')} />
          <ListItemSecondaryAction>
            <Switch
              data-tid="settingsSetSearchInSubfolders"
              onClick={() =>
                this.props.setSearchInSubfolders(
                  !this.props.settings.searchInSubfolders
                )
              }
              checked={this.props.settings.searchInSubfolders}
            />
          </ListItemSecondaryAction>
        </ListItem
        <ListItem>
          <ListItemText primary={i18n.t('core:showTagAreaOnStartup')} />
          <ListItemSecondaryAction>
            <Switch
              data-tid="settingsSetShowTagAreaOnStartup"
              onClick={() =>
                this.props.setShowTagAreaOnStartup(
                  !this.props.settings.showTagAreaOnStartup
                )
              }
              checked={this.props.settings.showTagAreaOnStartup}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary={i18n.t('core:useDefaultLocation')} />
          <ListItemSecondaryAction>
            <Switch
              data-tid="settingsSetUseDefaultLocation"
              onClick={() =>
                this.props.setUseDefaultLocation(
                  !this.props.settings.useDefaultLocation
                )
              }
              checked={this.props.settings.useDefaultLocation}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary={i18n.t('core:useTextExtraction')} />
          <ListItemSecondaryAction>
            <Switch
              onClick={() => this.props.setUseTextExtraction(!this.props.settings.useTextExtraction)}
              checked={this.props.settings.useTextExtraction}
            />
          </ListItemSecondaryAction>
        </ListItem>
*/

function mapStateToProps(state) {
  return {
    settings: getSettings(state)
  };
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(SettingsActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(
  withStyles(styles)(SettingsGeneral)
);
