//
//  DetailsTableViewController.swift
//  Application Monitor
//
//  Created by Teresa Bocchini on 2/23/18.
//  Copyright © 2018 Teresa Bocchini. All rights reserved.
//

import UIKit
import os.log

class WindowsAndMacDetailsTableViewController: UITableViewController {
    
    /*
     This value is passed by `ApplicationTableViewController` in `prepare(for:sender:)`
     */
    var application: Application?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        navigationItem.title = "\(application!.name) Details"
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: - Table view data source
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        // Table View cells are reused and should be dequeued using a cell identifier
        let cellIdentifier = "WindowsAndMacTableViewCell"
        
        guard let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as? WindowsAndMacTableViewCell else {
            fatalError("The dequeued cell is not an instance of ApplicationTableViewCell.")
        }
        
        cell.latestMacVersionLabel.text = application?.lastMacVersion
        cell.latestWindowsVersionLabel.text = application?.lastWindowsVersion
        cell.platformLabel.text = application?.platform.rawValue
        cell.windowsAndMacURLButton.setTitle("\(application?.name ?? "Application") Source", for: .normal)
        
        return cell
    }
    
    // MARK: - Navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        super.prepare(for: segue, sender: sender)
        
        switch(segue.identifier ?? "") {
        case "Unwind":
            os_log("Segue to unwind.", log: OSLog.default, type: .debug)
            break
        default:
            fatalError("Unexpected Segue Identifier; \(segue.destination)")
            break
        }
    }
    
    @IBAction func goToURLButton(_ sender: UIButton) {
        if let link = URL(string: application?.url ?? "https://google.com") {
            UIApplication.shared.open(link)
        }
    }
    
}
