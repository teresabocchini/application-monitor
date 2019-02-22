//
//  ApplicationTableViewController.swift
//  Application Monitor
//
//  Created by Teresa Bocchini on 2/23/18.
//  Copyright © 2018 Teresa Bocchini. All rights reserved.
//

import UIKit
import os.log
import UserNotifications
import FirebaseDatabase

class ApplicationTableViewController: UITableViewController, UNUserNotificationCenterDelegate {
    
    // MARK: Properties
    var applicationList = [Application]()
    var settings = Settings(enableOverallNotifications: false)
    private lazy var databaseReference: DatabaseReference = {
        return Database.database().reference()
    }()
    var selectedApplication: Application?
    
    // MARK: Public Functions
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        UNUserNotificationCenter.current().delegate = self
        
        let backItem = UIBarButtonItem()
        backItem.title = "List"
        navigationItem.backBarButtonItem = backItem
        
        tableView.estimatedRowHeight = 65.0
        tableView.rowHeight = UITableViewAutomaticDimension
        
        // Load saved data if available, else load initial data
        if let savedSettingsData = loadSettingsData() {
            self.settings = savedSettingsData
        } else {
            self.settings.enableOverallNotifications = false
        }
        
        initNotificationSetupCheck()
        self.configureDatabaseListeners()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func initNotificationSetupCheck() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound])
        { (success, error) in
            if success {
                self.settings.enableOverallNotifications = true
            } else {
                self.settings.enableOverallNotifications = false
            }
        }
    }
    
    // MARK: - User Notification Center functions
    
    func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        completionHandler([.alert, .sound])
    }
    
    // MARK: - Table view data source
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.applicationList.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        // Table View cells are reused and should be dequeued using a cell identifier
        let cellIdentifier = "ApplicationTableViewCell"
        
        guard let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as? ApplicationTableViewCell else {
            fatalError("The dequeued cell is not an instance of ApplicationTableViewCell.")
        }
        
        // Fetches the appropriate application for the data source layout
        let application = applicationList[indexPath.row]
        
        let platformPhoto = UIImage(named: application.platform.rawValue, in: Bundle.main, compatibleWith: self.traitCollection)
        
        cell.nameLabel.text = "\(application.name)"
        cell.photoImage.image = application.photo
        cell.platfromImage.image = platformPhoto
        
        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let application = applicationList[indexPath.row]
        self.selectedApplication = application
        
        if (selectedApplication?.platform.rawValue == "Windows") {
            self.performSegue(withIdentifier: "ShowWindowsDetail", sender: self)
        } else if (selectedApplication?.platform.rawValue == "Mac") {
            self.performSegue(withIdentifier: "ShowMacDetail", sender: self)
        } else if (selectedApplication?.platform.rawValue == "Windows and Mac") {
            self.performSegue(withIdentifier: "ShowWindowsAndMacDetail", sender: self)
        }
    }
    
     // MARK: - Navigation
     override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        super.prepare(for: segue, sender: sender)
        
        switch(segue.identifier ?? "") {
        case "ShowWindowsDetail":
            guard let applicationDetailViewController = segue.destination as? WindowsDetailsTableViewController else {
                fatalError("Unexpected destination: \(segue.destination)")
            }
            
            applicationDetailViewController.application = self.selectedApplication
            break
        case "ShowMacDetail":
            guard let applicationDetailViewController = segue.destination as? MacDetailsTableViewController else {
                fatalError("Unexpected destination: \(segue.destination)")
            }
            
            applicationDetailViewController.application = self.selectedApplication
            break
        case "ShowWindowsAndMacDetail":
            guard let applicationDetailViewController = segue.destination as? WindowsAndMacDetailsTableViewController else {
                fatalError("Unexpected destination: \(segue.destination)")
            }
            
            applicationDetailViewController.application = self.selectedApplication
            break
        case "Settings":
            guard let applicationSettingsViewController: SettingsTableViewController = (segue.destination as! UINavigationController).topViewController as? SettingsTableViewController else {
                fatalError("Unexpected destination: \(segue.destination)")
            }
            
            var newApplicationList = [Application]()
            for application in self.applicationList {
                newApplicationList.append(Application(original: application))
            }
            
            applicationSettingsViewController.settings = settings
            applicationSettingsViewController.applicationList = applicationList
            applicationSettingsViewController.originalApplicationList = newApplicationList
            
            os_log("Segue to settings.", log: OSLog.default, type: .debug)
            break
        default:
            fatalError("Unexpected Segue Identifier; \(segue.destination)")
            break
        }
     }
    
    // MARK: Actions
    @IBAction func unwindToApplicationList(sender: UIStoryboardSegue) {
        if let sourceViewController = sender.source as? SettingsTableViewController, let updatedSettings = sourceViewController.settings {
            
            settings = updatedSettings
            saveSettingData()
            //saveScheduleData()
        }
    }
    
    // MARK: Private Methods
    private func dateString(date: Date) -> String {
        let dateFormatter = DateFormatter()
        
        dateFormatter.dateStyle = .long
        dateFormatter.dateFormat = "MMM dd, YYYY HH:mm:ss"
        return dateFormatter.string(from: date)
    }
    
    private func saveSettingData() {
        let data = NSKeyedArchiver.archivedData(withRootObject: self.settings)
        UserDefaults.standard.set(data, forKey: "settings")
    }
    
    private func loadSettingsData() -> Settings? {
        if let data = UserDefaults.standard.object(forKey: "settings") as? Data {
            return NSKeyedUnarchiver.unarchiveObject(with: data) as? Settings
        } else {
            return nil
        }
    }
    
    // MARK: - Listeners
    private func configureDatabaseListeners() {
        
        // Item Added
        self.databaseReference.child("ApplicationList").observe(.childAdded) {
            (snapshot) in
            
            let child = snapshot.value as? [String: Any] ?? [:]
            
            self.applicationList.append(self.convertDictionaryToApplication(dictionary: child))
            self.applicationList.sort()
            self.tableView.reloadData()
        }
        
        // Item Removed
        self.databaseReference.child("ApplicationList").observe(.childRemoved) {
            (snapshot) in
            
            let value = snapshot.value as? [String: Any]
            let appName = value?["name"] as? String ?? ""
            var index = 0
            
            
            for applicationNumber in 0...self.applicationList.count {
                if appName == self.applicationList[applicationNumber].name {
                    index = applicationNumber
                    break;
                }
            }
            
            self.applicationList.remove(at: index)
            self.applicationList.sort()
            self.tableView.reloadData()
        }
        
        // Item Changed
        self.databaseReference.child("ApplicationList").observe(.childChanged) {
            (snapshot) in
            
            let value = snapshot.value as? [String: Any]
            let appName = value?["name"] as? String ?? ""
            
            for application in self.applicationList {
                if appName == application.name {
                    application.lastMacVersion = (value?["lastMacVersion"] as? String ?? "")
                    application.lastWindowsVersion = (value?["lastWindowsVersion"] as? String ?? "")
                    application.platform = Platform(rawValue: (value?["platform"] as? String ?? "")) ?? Platform(rawValue: "Windows and Mac")!
                    application.url = (value?["url"] as? String ?? "")
                    application.newMacVersion = (value?["newMacVersion"] as? String ?? "")
                    application.newWindowsVersion = (value?["newWindowsVersion"] as? String ?? "")
                    break;
                }
            }
            self.applicationList.sort()
            self.tableView.reloadData()      }
    }
    
    private func convertDictionaryToApplication (dictionary: [String: Any]) -> Application {
        let appName = dictionary["name"] as? String ?? ""
        let appPhoto = UIImage(named: appName, in: Bundle.main, compatibleWith: self.traitCollection)
        let appLastWindowsVersion = dictionary["lastWindowsVersion"] as? String ?? ""
        let appPlatformString = dictionary["platform"] as? String ?? ""
        let appNewWindowsVersion = dictionary["newWindowsVersion"] as? String ?? ""
        let appLastMacVersion = dictionary["lastMacVersion"] as? String ?? ""
        let appNewMacVersion = dictionary["name"] as? String ?? ""
        let appLastCheck = dictionary["lastCheck"] as? String ?? ""
        let appPlatform = Platform(rawValue: appPlatformString) ?? Platform(rawValue: "Windows and Mac")
        
        let appUrl = dictionary["url"] as? String ?? "https://google.com"
        
        let newApplication = Application(name: appName, photo: appPhoto, lastCheck: appLastCheck, platform: appPlatform!, lastWindowsVersion: appLastWindowsVersion, lastMacVersion: appLastMacVersion, newWindowsVersion: appNewWindowsVersion, newMacVersion: appNewMacVersion, Url: appUrl)
        
        return newApplication
    }
}
