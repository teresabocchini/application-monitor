//
//  SettingsTableViewController.swift
//  Application Monitor
//
//  Created by Teresa Bocchini on 3/1/18.
//  Copyright © 2018 Teresa Bocchini. All rights reserved.
//

import UIKit
import os.log

class SettingsTableViewController: UITableViewController {
    
    // MARK: Properties
    var settings: Settings?
    var applicationList = [Application]()
    var originalApplicationList = [Application]()
    @IBOutlet weak var saveButton: UIBarButtonItem!
    @IBOutlet weak var notificationSwitch: UISwitch!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        configureSettingsCells()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        super.prepare(for: segue, sender: sender)
        
        switch(segue.identifier ?? "") {
        case "Unwind":
            guard let applicationTableViewController = segue.destination as? ApplicationTableViewController else {
                fatalError("Unexpected destination: \(segue.destination)")
            }
            
            // Configure the destination view controller only when the save button is pressed.
            guard let button = sender as? UIBarButtonItem, button === saveButton else {
                os_log("The save button was not pressed, cancelling.", log: OSLog.default, type: .debug)
                
                applicationTableViewController.applicationList = self.originalApplicationList
                return
            }
            
            os_log("The save button was pressed, confirming..", log: OSLog.default, type: .debug)
            
            // update settings and send them back when save button is pressed
            if notificationSwitch.isOn {
                settings?.enableOverallNotifications = true
            } else {
                settings?.enableOverallNotifications = false
            }
            
            applicationTableViewController.applicationList = self.applicationList
            os_log("Segue to unwind.", log: OSLog.default, type: .debug)
            break
        default:
            fatalError("Unexpected Segue Identifier; \(segue.destination)")
            break
        }
    }
    
    // MARK: Actions
    @IBAction func cancel(_ sender: UIBarButtonItem) {
        dismiss(animated: true, completion: nil)
    }
    
    @IBAction func unwindToSettings(sender: UIStoryboardSegue) {
    }
    
    // MARK: Private Functions
    private func configureSettingsCells() {        
        if (settings?.enableOverallNotifications)! {
            notificationSwitch.setOn(true, animated: true)
        } else {
            notificationSwitch.setOn(false, animated: true)
        }
    }
}
