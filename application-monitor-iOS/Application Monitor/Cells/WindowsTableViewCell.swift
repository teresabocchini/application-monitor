//
//  WindowsTableViewCell.swift
//  Application Monitor
//
//  Created by Teresa Bocchini on 1/28/19.
//  Copyright © 2019 Teresa Bocchini. All rights reserved.
//

import UIKit

class WindowsTableViewCell: UITableViewCell {

    // MARK: Properties
    @IBOutlet weak var latestWindowsVersionLabel: UILabel!
    @IBOutlet weak var platformLabel: UILabel!
    @IBOutlet weak var windowsURLButton: UIButton!
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
}
